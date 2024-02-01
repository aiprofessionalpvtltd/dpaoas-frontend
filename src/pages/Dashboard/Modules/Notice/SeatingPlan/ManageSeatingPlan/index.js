import React, { useEffect, useState } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import Modal from "react-modal";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { getAllSeats } from "../../../../../../api/APIs";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%", // Adjust the width as needed, for example '80%'
  },
};

function ManageSeatingPlan() {
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    name: "",
    seatNo: 0,
  });

  const openModal = (item) => {
    // Inside a function or event handler
    setSelectedItem({
      id: item.id,
      name: item.name,
      seatNo: item.seatNo,
    });
    setIsOpen(true);
  };

  // const seats = [
  //   {
  //     id: 1,
  //     name: "انور لال دین",
  //     seatNo: 109,
  //   },
  //   {
  //     id: 2,
  //     name: "انور لال دین",
  //     seatNo: 108,
  //   },
  //   {
  //     id: 3,
  //     name: "انور لال دین",
  //     seatNo: 107,
  //   },
  //   {
  //     id: 4,
  //     name: "انور لال دین",
  //     seatNo: 106,
  //   },
  //   {
  //     id: 5,
  //     name: "انور لال دین",
  //     seatNo: 105,
  //   },
  //   {
  //     id: 6,
  //     name: "انور لال دین",
  //     seatNo: 104,
  //   },
  //   {
  //     id: 7,
  //     name: "انور لال دین",
  //     seatNo: 103,
  //   },
  //   {
  //     id: 8,
  //     name: "انور لال دین",
  //     seatNo: 102,
  //   },
  //   {
  //     id: 9,
  //     name: "انور لال دین",
  //     seatNo: 101,
  //   },
  // ];

  const getAllSeatsApi = async () => {
    try {
      const response = await getAllSeats();
      if (response?.success) {
        setSeats(response?.data);
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    getAllSeatsApi();
  }, []);

  return (
    // <Layout
    //   module={true}
    //   sidebarItems={NoticeSidebarItems}
    //   centerlogohide={true}
    // >
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="card">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Add/Edit Seat</h1>
          </div>
          <div class="card-body">
            <div className="row">
              <div className="col-8">
                <div className="mb-3">
                  <label className="form-label">Seat No</label>
                  <input
                    type="text"
                    className={`form-control`}
                    id="seatNo"
                    placeholder={selectedItem?.seatNo}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-8">
                <div>
                  <label className="form-label">Member Name</label>
                  <input
                    type="text"
                    className={`form-control`}
                    id="member"
                    placeholder={"Member Name"}
                    value={selectedItem?.name}
                    onChange={(e) => {
                      setSelectedItem({
                        ...selectedItem,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex row justify-content-center align-items-center">
              <div className="col-4" style={{ marginTop: "30px" }}>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ width: 150 }}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
              <div className="col-4" style={{ marginTop: "30px" }}>
                <Button
                  variant="success"
                  type="submit"
                  style={{ width: 150 }}
                  onClick={() => setIsOpen(false)}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div
        style={{
          overflowY: "auto",
          maxHeight: "100%",
          background: "#F0F2F5",
        }}
      >
        <div class="dashboard-content">
          <div class="container-fluid">
            <div class="sitting-plan-main">
              <div class="sitting-row">
                <div class="row">
                  <div class="col">
                    {seats.map((item, index) => (
                      <div
                        class="sitting-card-left float-start"
                        onClick={() => openModal(item)}
                      >
                        <div class="sitt-card-left">
                          <h2>{item?.member?.memberName}</h2>
                        </div>
                        <p>{item.seatNo}</p>
                      </div>
                    ))}
                  </div>
                  <div class="col-1 text-center">
                    <strong>F</strong>
                  </div>
                  <div class="col">
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>100</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>99</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>98</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>97</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>96</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>95</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>94</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>93</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>92</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sitting-row">
                <div class="row">
                  <div class="col">
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>91</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>90</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>89</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>88</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>87</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>86</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>85</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>84</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>83</p>
                    </div>
                  </div>
                  <div class="col-1 text-center">
                    <strong>E</strong>
                  </div>
                  <div class="col">
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>82</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>81</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>80</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>79</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>78</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>77</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>76</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>75</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>74</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sitting-row">
                <div class="row">
                  <div class="col">
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>73</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>72</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>71</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>70</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>69</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>68</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>67</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>66</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>65</p>
                    </div>
                  </div>
                  <div class="col-1 text-center">
                    <strong>D</strong>
                  </div>
                  <div class="col">
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>64</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>63</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>62</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>61</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>60</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>59</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>58</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>57</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>56</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sitting-row">
                <div class="row">
                  <div class="col">
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>55</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>51</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>53</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>52</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>51</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>50</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>49</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>48</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>47</p>
                    </div>
                  </div>
                  <div class="col-1 text-center">
                    <strong>C</strong>
                  </div>
                  <div class="col">
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>46</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>45</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>44</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>43</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>42</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>41</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>40</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>39</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>38</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sitting-row">
                <div class="row">
                  <div class="col">
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>37</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>36</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>35</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>34</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>33</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>32</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>31</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>30</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>29</p>
                    </div>
                  </div>
                  <div class="col-1 text-center">
                    <strong>B</strong>
                  </div>
                  <div class="col">
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>28</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>27</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>26</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>25</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>24</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>23</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>22</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>21</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>20</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sitting-row">
                <div class="row">
                  <div class="col">
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>19</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>18</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>17</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>16</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>15</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>14</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>13</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>12</p>
                    </div>
                    <div class="sitting-card-left float-start">
                      <div class="sitt-card-left">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>11</p>
                    </div>
                  </div>
                  <div class="col-1 text-center">
                    <strong>A</strong>
                  </div>
                  <div class="col">
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>10</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>9</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>8</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>7</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>6</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>5</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>4</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>3</p>
                    </div>
                    <div class="sitting-card-right float-start">
                      <div class="sitt-card-right">
                        <h2>انور لال دین</h2>
                      </div>
                      <p>2</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="center-content">
                <h3>CHAIRMAN</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageSeatingPlan;
