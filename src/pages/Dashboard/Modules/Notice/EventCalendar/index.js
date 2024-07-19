import React, { useCallback, useEffect, useState } from 'react'
import { Layout } from '../../../../../components/Layout'
import { NoticeSidebarItems } from '../../../../../utils/sideBarItems'
import { ToastContainer } from 'react-toastify'
import Header from '../../../../../components/Header'
import CustomTable from '../../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'
import { DeleteEventCalendar, getAllEventCalendar } from '../../../../../api/APIs/Services/EventCalendar.services'
import { showErrorMessage, showSuccessMessage } from '../../../../../utils/ToastAlert'
import moment from 'moment'

function EventCalendar() {
  const navigate = useNavigate()
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [eventData, setEventData] = useState([]);
  const pageSize = 10;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const transformEventCalendarData = (apiData) => {
    return apiData.map((item) => ({
      id: item?.id,
      title: item?.title,
      countryName: item?.countryName,
      houseType: item?.houseType,
      electionType:item?.electionType,
      description:item?.description,
      eventDate:moment(item?.eventDate).format("YYYY-MM-DD"),
      status:item?.status
    }));
  };
  const getEventCalendarApi = async () => {
    try {
      const response = await getAllEventCalendar(currentPage, pageSize);
      if (response?.success) {
        const transformedData = transformEventCalendarData(response?.data?.eventData);
        setCount(response?.data.count);
        setEventData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await DeleteEventCalendar(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getEventCalendarApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };
  useEffect(() => {
    getEventCalendarApi();
  }, [currentPage]);
  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/notice/dashboard"}
        title1={"Event Calendar"}
      />
      <div>
        <div class="container-fluid">
            <div class="row">
              <div class="col">
                <CustomTable
                  block={false}
                  data={eventData}
                  addBtnText={"Create Event Calendar"}
                  singleDataCard={true}
                  tableTitle="Event Calendar"
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  headertitlebgColor={"#666"}
                  headertitletextColor={"#FFF"}
                  totalCount={count}
                  handleAdd={() => navigate("/notice/event-calendar/addedit")}
                  handleEdit={(item) => navigate("/notice/event-calendar/addedit", { state: item })}
                  handleDelete={(item) => handleDelete(item.id)}
                />
              </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default EventCalendar