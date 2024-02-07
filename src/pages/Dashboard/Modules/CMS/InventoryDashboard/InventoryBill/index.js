import React, { useCallback, useEffect, useState } from 'react'
import { CMSsidebarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import Header from '../../../../../../components/Header';
import { useNavigate } from 'react-router';
import { SearchInvoiceBill, getAllInvoiceBill, getInventoryBillsById, invoiceBillDelete } from '../../../../../../api/APIs/Services/Complaint.service';
import moment from 'moment';
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert';
import { ToastContainer } from 'react-toastify';

function CMSInventoryBill() {
    const navigate = useNavigate()
    const [count, setCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [inventoryBill,setInventoryBill] = useState([])
    const pageSize = 5; // Set your desired page size
  
    const handlePageChange = (page) => {
      // Update currentPage when a page link is clicked
      setCurrentPage(page);
    };
 
    const transformInventoryBillData = (apiData) => {
      return apiData.map((item) => ({
        id:item.id,
        invioceNumber: item?.invoiceNumber,
        vendorName: item?.vendor?.vendorName,
        quantity: item?.quantity,
        description: item?.description,
        invoiceDate:moment(item?.invoiceDate).format("MM/DD/YYYY"),
        status:item?.status

        // date: moment(item?.date).format("YYYY/MM/DD"),
      //   contactMembers: item?.contactMembers[0]?.member.memberName
      }));
    };
    const getAllInvoiceBillApi = useCallback(async () => {
      try {
        const response = await getAllInvoiceBill(currentPage, pageSize);
        if (response?.success) {
          const transformedData = transformInventoryBillData(response?.data?.inventoryBills);
          setCount(response?.data?.count);
          setInventoryBill(transformedData);
        }
      } catch (error) {
        console.log(error);
      }
    }, [currentPage, pageSize, setCount, setInventoryBill]);
  

    const SearchInvoiceBillAPi = async (data) => {
        try {
          const response = await SearchInvoiceBill(data); // Add await here
          if (response?.success) {
            const transformedData = transformInventoryBillData(response?.data);
            setCount(1)
            setInventoryBill(transformedData);
          }
        } catch (error) {
          showErrorMessage(error?.response?.data?.message)
        }
      };

      const hendleDelete = async (id) => {
        try {
          const response = await invoiceBillDelete(id); // Add await here
          if (response?.success) {
            showSuccessMessage(response?.message)
            getAllInvoiceBillApi()
          }
        } catch (error) {
          showErrorMessage(error?.response?.data?.message)
        }
      };

      const hendleEdit  = async (id) => {
        try {
            const response = await getInventoryBillsById(id)
            if (response?.success) {
                navigate("/cms/admin/inventory/inventory-bill/add", {state: response?.data})
            }
        } catch (error) {
            console.log(error);
        }
      }

    useEffect(() => {
      getAllInvoiceBillApi()
    },[getAllInvoiceBillApi])
  return (
    <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
    <Header
      dashboardLink={"/sms/dashboard"}
    />
    <ToastContainer />
    <div class="row">
      <div class="col-12">
      <CustomTable
        data={inventoryBill}
        tableTitle={"Inventory Bill Information"}
        // hideBtn={true}
        addBtnText={"Add Bill"}
        handleAdd={() => navigate("/cms/admin/inventory/inventory-bill/add")}
        singleDataCard={true}
        // ActionHide={true}
        hideDeleteIcon={false}
        hideEditIcon={false}
        headertitlebgColor={"#666"}
        headertitletextColor={"#FFF"}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={count}
        seachBarShow={true}
        searchonchange={(e) => SearchInvoiceBillAPi(e.target.value)}
        handleDelete={(item) => hendleDelete(item.id)}
        handleEdit={(item) => hendleEdit(item.id)}
        />
         
      </div>
    </div>
    
  </Layout>
  )
}

export default CMSInventoryBill