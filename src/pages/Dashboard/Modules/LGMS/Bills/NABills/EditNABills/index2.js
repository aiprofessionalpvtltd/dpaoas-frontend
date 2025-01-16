<form onSubmit={formik.handleSubmit}>
  <div>
    <div className="container-fluid">
      <div class="card mt-1">
        <div class="card-header red-bg">
          <h1>
            {location?.state?.forPerson === "Ministers"
              ? "Update Bill (Government Bill /Received From NA) "
              : "Update Bill (Private Member Bill /Received From NA) "}
          </h1>
        </div>
        <div className="card-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                {showMinster === "Ministers" ? (
                  <label className="form-label">Minister Tenure</label>
                ) : (
                  <label className="form-label">Member Tenure</label>
                )}

                <Select
                  options={
                    Array.isArray(tenures) && tenures?.length > 0
                      ? tenures.map((item) => ({
                          value: item?.id,
                          label: `${item?.tenureName} (${item?.tenureType})`,
                          tenureType: item?.tenureType,
                        }))
                      : []
                  }
                  onChange={(selectedOption) => {
                    formik.setFieldValue("membertenure", selectedOption);
                    if (showMinster === "Ministers") {
                      getParliamentaryYearsonTheBaseOfTenure(
                        selectedOption?.value
                      );
                    } else {
                      handleTenuresTerms(selectedOption?.value);
                    }
                    formik.setFieldValue("fkTermId", "");
                    formik.setFieldValue("fkParliamentaryYearId", "");
                    formik.setFieldValue("senateBillSenatorMovers", "");
                    formik.setFieldValue("senateBillMnaMovers", null);
                    formik.setFieldValue("senateBillMinistryMovers", null);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.membertenure}
                  id="membertenure"
                  name="membertenure"
                  isClearable={true}
                />
                {formik.touched.membertenure && formik.errors.membertenure && (
                  <div className="invalid-feedback">
                    {formik.errors.membertenure}
                  </div>
                )}
              </div>
              {showMinster !== "Ministers" && (
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Member Term</label>
                    <Select
                      options={
                        Array.isArray(tenuresTerms) && tenuresTerms?.length > 0
                          ? tenuresTerms.map((item) => ({
                              value: item?.id,
                              label: `${item?.termName}`,
                            }))
                          : []
                      }
                      onChange={(selectedOption) => {
                        formik.setFieldValue("fkTermId", selectedOption);
                        formik.setFieldValue("fkParliamentaryYearId", "");
                        formik.setFieldValue("senateBillSenatorMovers", "");
                        if (selectedOption?.value) {
                          getParliamentaryYearsonTheBaseOfTerm(
                            selectedOption?.value
                          );
                        }
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.fkTermId}
                      id="fkTermId"
                      name="fkTermId"
                      isClearable={true}
                    />
                  </div>
                </div>
              )}

              <div class="col">
                <div class="mb-3">
                  {showMinster === "Ministers" ? (
                    <label className="form-label">Parliamentary Year</label>
                  ) : (
                    <label className="form-label">Parliamentary Year</label>
                  )}

                  {/* <label class="form-label"></label> */}
                  <select
                    id="fkParliamentaryYearId"
                    name="fkParliamentaryYearId"
                    className={`form-select  ${
                      formik.touched.fkParliamentaryYearId &&
                      formik.errors.fkParliamentaryYearId
                        ? "is-invalid"
                        : ""
                    }`}
                    onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      formik.handleChange(e);
                      setMembersOnParliamentaryYear([]);
                      getMembersOnParliamentaryYear(e.target.value);
                      getMNAOnParliamentaryYear(e.target.value);
                      formik.setFieldValue("senateBillMnaMovers", []);
                      formik.setFieldValue("senateBillMinistryMovers", []);
                      formik.setFieldValue("senateBillSenatorMovers", []);
                      // console.log("id", selectedId);
                    }}
                    value={formik.values.fkParliamentaryYearId}
                  >
                    <option value="" disabled hidden>
                      Select
                    </option>
                    {parliamentaryYearData &&
                      parliamentaryYearData?.length > 0 &&
                      parliamentaryYearData.map((item) => (
                        <option value={item?.id}>
                          {item?.parliamentaryTenure}
                        </option>
                      ))}
                  </select>
                  {formik.touched.fkParliamentaryYearId &&
                    formik.errors.fkParliamentaryYearId && (
                      <div className="invalid-feedback">
                        {formik.errors.fkParliamentaryYearId}
                      </div>
                    )}
                </div>
              </div>
              {showMinster === "Ministers" ? (
                <>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">Introduced By</label>
                      <Select
                        options={
                          Array.isArray(ministersOnParliamentaryYear) &&
                          ministersOnParliamentaryYear.length > 0
                            ? ministersOnParliamentaryYear.map((item) => ({
                                value: item?.id,
                                label: item?.mnaName,
                              }))
                            : []
                        }
                        onChange={(selectedOption) => {
                          formik.setFieldValue(
                            "senateBillMnaMovers",
                            selectedOption
                          );
                          formik.setFieldValue(
                            "senateBillMinistryMovers",
                            null
                          );
                          setMinisterID(selectedOption?.value);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.senateBillMnaMovers}
                        name="senateBillMnaMovers"
                        className={`${
                          formik.touched.senateBillMnaMovers &&
                          formik.errors.senateBillMnaMovers
                            ? "is-invalid"
                            : ""
                        }`}
                      />

                      {formik.touched.senateBillMnaMovers &&
                        formik.errors.senateBillMnaMovers && (
                          <div class="invalid-feedback">
                            {formik.errors.senateBillMnaMovers}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col">
                    <label className="form-label">Concerned Ministry</label>
                    <Select
                      options={
                        ministryDataOnMinister &&
                        ministryDataOnMinister?.map((item) => ({
                          value: item.id,
                          label: item?.ministryName,
                        }))
                      }
                      name="senateBillMinistryMovers"
                      id="senateBillMinistryMovers"
                      onChange={(selectedOptions) =>
                        formik.setFieldValue(
                          "senateBillMinistryMovers",
                          selectedOptions
                        )
                      }
                      className={` ${
                        formik.touched.senateBillMinistryMovers &&
                        formik.errors.senateBillMinistryMovers
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.senateBillMinistryMovers}
                    />
                    {formik.touched.senateBillMinistryMovers &&
                      formik.errors.senateBillMinistryMovers && (
                        <div class="invalid-feedback">
                          {formik.errors.senateBillMinistryMovers}
                        </div>
                      )}
                  </div>
                </>
              ) : (
                <div className="col">
                  <div className="mb-3">
                    <label class="form-label">Select Senator</label>
                    <Select
                      options={
                        Array.isArray(membersOnParliamentaryYear) &&
                        membersOnParliamentaryYear.length > 0
                          ? membersOnParliamentaryYear.map((item) => ({
                              value: item.id,
                              label: item?.memberName,
                            }))
                          : []
                      }
                      id="senateBillSenatorMovers"
                      name="senateBillSenatorMovers"
                      onChange={(selectedOptions) =>
                        formik.setFieldValue(
                          "senateBillSenatorMovers",
                          selectedOptions
                        )
                      }
                      value={formik.values.senateBillSenatorMovers}
                      isMulti={true}
                      className={` ${
                        formik.touched.senateBillSenatorMovers &&
                        formik.errors.senateBillSenatorMovers
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.senateBillSenatorMovers &&
                      formik.errors.senateBillSenatorMovers && (
                        <div class="invalid-feedback">
                          {formik.errors.senateBillSenatorMovers}
                        </div>
                      )}
                  </div>
                </div>
              )}

              <div className="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Session</label>
                    <select
                      id="fkSessionId"
                      name="fkSessionId"
                      className={`form-control  ${
                        formik.touched.fkSessionId && formik.errors.fkSessionId
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.fkSessionId}
                    >
                      <option value="" disabled hidden>
                        Select
                      </option>
                      {sessions &&
                        sessions.map((item) => (
                          <option value={item.id}>{item.sessionName}</option>
                        ))}
                    </select>
                    {formik.touched.fkSessionId &&
                      formik.errors.fkSessionId && (
                        <div class="invalid-feedback">
                          {formik.errors.fkSessionId}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">File Number</label>

                    <input
                      type="text"
                      id="fileNumber"
                      name="fileNumber"
                      className={`form-control ${
                        formik.touched.fileNumber && formik.errors.fileNumber
                          ? "is-invalid"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fileNumber}
                    />
                    {formik.touched.fileNumber && formik.errors.fileNumber && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block" }}
                      >
                        {formik.errors.fileNumber}
                      </div>
                    )}
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Bill Type </label>
                    <select
                      id="billType"
                      name="billType"
                      className={`form-select ${
                        formik.touched.billType && formik.errors.billType
                          ? "is-invalid"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.billType}
                    >
                      <option value="" disabled hidden>
                        Select
                      </option>
                      <option value="Amendment Bill">Amendment Bill</option>
                      <option value="Constitutional Amendment Bill">
                        Constitution Amendment Bill
                      </option>
                      <option value="New Bill">New Law</option>
                    </select>
                    {formik.touched.billType && formik.errors.billType && (
                      <div class="invalid-feedback">
                        {formik.errors.billType}
                      </div>
                    )}
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label">Bill Status</label>
                    <Select
                      options={
                        billStatusData &&
                        billStatusData?.map((item) => ({
                          value: item.id,
                          label: item?.billStatusName,
                        }))
                      }
                      onChange={(selectedOptions) =>
                        formik.setFieldValue("fkBillStatus", selectedOptions)
                      }
                      // onBlur={formikAssigned.handleBlur}
                      value={formik.values.fkBillStatus}
                      name="fkBillStatus"
                    />
                    {formik.touched.fkBillStatus &&
                      formik.errors.fkBillStatus && (
                        <div class="invalid-feedback">
                          {formik.errors.fkBillStatus}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* <div class="col-3">
              <div class="mb-3">
                <label class="form-label">Bill Type </label>
                <select
                  id="billType"
                  name="billType"
                  className={`form-select ${
                    formik.touched.billType && formik.errors.billType
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.billType}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  <option value="Amendment Bill">
                    Amendment Bill
                  </option>
                  <option value="Constitutional Amendment Bill">
                    Constitutional Amendment Bill
                  </option>
                  <option value="Finance Bill">Finance Bill</option>
                  <option value="Money Bill">Money Bill</option>
                  <option value="New Bill">New Bill</option>
                </select>
                {formik.touched.billType &&
                  formik.errors.billType && (
                    <div class="invalid-feedback">
                      {formik.errors.billType}
                    </div>
                  )}
              </div>
            </div> */}
              {/* <div className="col">
              <div className="mb-3">
                <label className="form-label">File Number</label>

                <input
                  type="text"
                  id="fileNumber"
                  name="fileNumber"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fileNumber}
                />
                {formik.touched.fileNumber &&
                  formik.errors.fileNumber && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {formik.errors.fileNumber}
                    </div>
                  )}
              </div>
            </div> */}

              <div className="col-3">
                <div className="mb-3" style={{ position: "relative" }}>
                  <label className="form-label">Passed By NA Date</label>
                  <span
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "36px",
                      zIndex: 1,
                      fontSize: "20px",
                      color: "#666",
                      cursor: "pointer",
                    }}
                    onClick={handleCalendarToggle}
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </span>

                  <DatePicker
                    selected={formik.values.PassedByNADate}
                    onChange={handleDateSelect}
                    onBlur={formik.handleBlur}
                    className={`form-control ${
                      formik.touched.PassedByNADate &&
                      formik.errors.PassedByNADate
                        ? "is-invalid"
                        : ""
                    }`}
                    open={isCalendarOpen}
                    onClickOutside={() => setIsCalendarOpen(false)}
                    onInputClick={handleCalendarToggle}
                    // onClick={handleCalendarToggle}
                    maxDate={new Date()}
                    dateFormat="dd-MM-yyyy"
                  />

                  {formik.touched.PassedByNADate &&
                    formik.errors.PassedByNADate && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block" }}
                      >
                        {formik.errors.PassedByNADate}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-3">
                <div className="mb-3" style={{ position: "relative" }}>
                  <label className="form-label">
                    Date of Recipt of Message From NA
                  </label>
                  <span
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "36px",
                      zIndex: 1,
                      fontSize: "20px",
                      color: "#666",
                      cursor: "pointer",
                    }}
                    onClick={handleReciptCalendarToggle}
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </span>

                  <DatePicker
                    selected={formik.values.DateOfReceiptOfMessageFromNA}
                    onChange={handleReciptDateSelect}
                    onBlur={formik.handleBlur}
                    className={`form-control ${
                      formik.touched.DateOfReceiptOfMessageFromNA &&
                      formik.errors.DateOfReceiptOfMessageFromNA
                        ? "is-invalid"
                        : ""
                    }`}
                    name="DateOfReceiptOfMessageFromNA"
                    open={isDateofReciptCalendarOpen}
                    onClickOutside={() => setIsDateofReciptCalendarOpen(false)}
                    onInputClick={handleReciptCalendarToggle}
                    // onClick={handleCalendarToggle}
                    maxDate={new Date()}
                    dateFormat="dd-MM-yyyy"
                  />

                  {formik.touched.DateOfReceiptOfMessageFromNA &&
                    formik.errors.DateOfReceiptOfMessageFromNA && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block" }}
                      >
                        {formik.errors.DateOfReceiptOfMessageFromNA}
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Bill Title</label>
                  <textarea
                    className={`form-control  ${
                      formik.touched.billTitle && formik.errors.billTitle
                        ? "is-invalid"
                        : ""
                    }`}
                    id="billTitle"
                    name="billTitle"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.billTitle}
                  ></textarea>
                  {formik.touched.billTitle && formik.errors.billTitle && (
                    <div className="invalid-feedback">
                      {formik.errors.billTitle}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Bill Text</label>
                <textarea
                  className={`form-control  ${
                    formik.touched.billText && formik.errors.billText
                      ? "is-invalid"
                      : ""
                  }`}
                  id="billText"
                  name="billText"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.billText}
                ></textarea>
                {formik.touched.billText &&
                  formik.errors.billText && (
                    <div className="invalid-feedback">
                      {formik.errors.billText}
                    </div>
                  )}
              </div>
            </div>
          </div> */}

            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Bill Remarks</label>
                  <textarea
                    className={`form-control  ${
                      formik.touched.billRemarks && formik.errors.billRemarks
                        ? "is-invalid"
                        : ""
                    }`}
                    id="billRemarks"
                    name="billRemarks"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.billRemarks}
                  ></textarea>
                  {formik.touched.billRemarks && formik.errors.billRemarks && (
                    <div className="invalid-feedback">
                      {formik.errors.billRemarks}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* 2nd card */}

  <div className="mt-2">
    <div className="container-fluid">
      <div class="card mt-1">
        <div className="card-body">
          <div className="container-fluid">
            <div className="row">
              {/* <div class="col">
              <div class="mb-3" style={{ position: "relative" }}>
                <label class="form-label">
                  Introduced in House On
                </label>
                <span
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "36px",
                    zIndex: 1,
                    fontSize: "20px",
                    color: "#666",
                    cursor: "pointer",
                  }}
                  onClick={handleIntroducedCalendarToggle}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </span>
                <DatePicker
                  selected={formik.values.introducedInHouseDate}
                  onChange={handleIntroducedDateSelect}
                  onBlur={formik.handleBlur}
                  className="form-control"
                  open={isIntroducedCalendarOpen}
                  onClickOutside={() =>
                    setIntroducedCalendarOpen(false)
                  }
                  onInputClick={handleIntroducedCalendarToggle}
                  maxDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
            </div> */}
              <div class="col-3">
                <div class="mb-3" style={{ position: "relative" }}>
                  <label class="form-label">Date of Circulation Of Bill</label>
                  <span
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "36px",
                      zIndex: 1,
                      fontSize: "20px",
                      color: "#666",
                    }}
                    onClick={handleCirculationCalendarToggle}
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </span>
                  <DatePicker
                    selected={formik.values.dateOfCirculationOfBill}
                    onChange={handleCirculationDateSelect}
                    className={"form-control"}
                    open={isCirculationCalendarOpen}
                    onClickOutside={() => setIsCirculationCalendarOpen(false)}
                    onInputClick={handleCirculationCalendarToggle}
                    maxDate={new Date()}
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
              </div>

              <div className="col-3">
                <div class="mb-3 " style={{ position: "relative" }}>
                  <label class="form-label">Date of Receipt of Notice</label>
                  <span
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "36px",
                      zIndex: 1,
                      fontSize: "20px",
                      color: "#666",
                    }}
                    onClick={handleRecepitMesageCalendarToggle}
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </span>
                  <DatePicker
                    selected={formik.values.dateofReciptofNotice}
                    onChange={handleRecepitMesageDateSelect}
                    className={"form-control"}
                    open={isRecepitMesageDateCalendarOpen}
                    onClickOutside={() =>
                      setRecepitMesageDateCalendarOpen(false)
                    }
                    onInputClick={handleRecepitMesageCalendarToggle}
                    maxDate={new Date()}
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
              </div>

              <div className="col-3">
                <div class="mb-3 " style={{ position: "relative" }}>
                  <label class="form-label">
                    Date of Circulation of Notice
                  </label>
                  <span
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "36px",
                      zIndex: 1,
                      fontSize: "20px",
                      color: "#666",
                    }}
                    onClick={handleCirculationNoticeCalendarToggle}
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </span>
                  <DatePicker
                    selected={formik.values.dateOfCirculationOfNotice}
                    onChange={handleCirculationNoticeDateSelect}
                    className={"form-control"}
                    open={isCirculationNoticeDateCalendarOpen}
                    onClickOutside={() =>
                      handleCirculationNoticeDateSelect(false)
                    }
                    onInputClick={handleCirculationNoticeCalendarToggle}
                    maxDate={new Date()}
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
              </div>

              {/* <div class="col">
              <div class="mb-3" style={{ position: "relative" }}>
                <label class="form-label">
                  Referred to Committee on
                </label>
                <span
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "36px",
                    zIndex: 1,
                    fontSize: "20px",
                    color: "#666",
                  }}
                  onClick={handleReferredCalendarToggle}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </span>
                <DatePicker
                  selected={formik.values.referedOnDate}
                  onChange={handleReferredDateSelect}
                  className={"form-control"}
                  open={isReferredCalendarOpen}
                  onClickOutside={() =>
                    setReferredCalendarOpen(false)
                  }
                  onInputClick={handleReferredCalendarToggle}
                  maxDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
            </div> */}
              <div className="col">
                <label className="form-label">Introduced in Session</label>
                <select
                  id="fkSessionId"
                  name="fkSessionId"
                  className="form-select"
                  onChange={formik.handleChange}
                  value={formik.values.fkSessionId}
                >
                  <option value="" disabled hidden>
                    Select Session
                  </option>
                  {sessions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.sessionName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col">
                <label className="form-label">Concerned Committee</label>
                <select
                  id="fkManageCommitteeId"
                  name="fkManageCommitteeId"
                  className="form-select"
                  onChange={formik.handleChange}
                  value={formik.values.fkManageCommitteeId}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {committieeData &&
                    committieeData.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.committeeName}
                      </option>
                    ))}
                </select>
                {/* <Select
                options={
                  committieeData &&
                  committieeData?.map((item) => ({
                    value: item.id,
                    label: item?.committeeName,
                  }))
                }
                id="fkManageCommitteeId"
                name="fkManageCommitteeId"
                onChange={(selectedOptions) =>
                  formik.setFieldValue(
                    "fkManageCommitteeId",
                    selectedOptions
                  )
                }
                value={formik.values.fkManageCommitteeId}
                isMulti={true}
              /> */}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-3">
                <div className="form-group col">
                  <label className="form-label">Committee Recommendation</label>
                  <Select
                    options={
                      commiteeRecommendations &&
                      commiteeRecommendations.map((item) => ({
                        value: item?.id,
                        label: item?.committeeRecomendation,
                      }))
                    }
                    onChange={(selectedOption) => {
                      formik.setFieldValue(
                        "committeeRecomendation",
                        selectedOption
                      );
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.committeeRecomendation}
                    name="committeeRecomendation"
                    className={` ${
                      formik.touched.committeeRecomendation &&
                      formik.errors.committeeRecomendation
                        ? "is-invalid"
                        : ""
                    }`}
                    // isMulti
                  />
                </div>
                {/* <label className="form-label">
                Committee Recommendation
              </label>
              <select
                class="form-select"
                value={formik.values.committeeRecomendation}
                id="committeeRecomendation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option selected disabled hidden>
                  Select
                </option>
                <option value="Ammended By Standing Committee">
                  Ammended By Standing Committee
                </option>
                <option value="May be Passed as Introduced in the House">
                  May be Passed as Introduced in the House
                </option>
                <option value="Passed without sending to Committee">
                  Passed without sending to Committee
                </option>
                <option value="Ammended By Standing Committee">
                  Ammended By Standing Committee
                </option>
              </select> */}
              </div>

              <div class="col-3">
                <div class="mb-3" style={{ position: "relative" }}>
                  <label class="form-label">
                    Date of presenation of report
                  </label>
                  <span
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "36px",
                      zIndex: 1,
                      fontSize: "20px",
                      color: "#666",
                    }}
                    onClick={handleReportPresenatationDayCalendarToggle}
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </span>
                  <DatePicker
                    selected={formik.values.reportPresentationDate}
                    onChange={handleReportPresenatationDateSelect}
                    className={"form-control"}
                    open={isReportPresentationCalendarOpen}
                    onClickOutside={() =>
                      setReportPresentationCalendarOpen(false)
                    }
                    onInputClick={handleReportPresenatationDayCalendarToggle}
                    maxDate={new Date()}
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* 3rd card */}

  <div className="mt-2">
    <div className="container-fluid">
      <div class="card mt-1">
        <div className="card-body">
          <div className="container-fluid">
            <div className="row">
              <div className="form-group col">
                <label htmlFor="passageWithdrawal" className="form-label">
                  Memeber Passage/Withdrawal Status
                </label>

                <select
                  id="fkMemberPassageId"
                  name="fkMemberPassageId"
                  className={`form-select ${
                    formik.touched.fkMemberPassageId &&
                    formik.errors.fkMemberPassageId
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fkMemberPassageId}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  <option value={"Passage"}>Passage</option>
                  <option value={"withdrawal"}>withdrawal</option>
                </select>
              </div>

              <div className="col">
                <div class="mb-3 " style={{ position: "relative" }}>
                  <label class="form-label">
                    Memeber Passage/Withdrawal Notice Date
                  </label>
                  <span
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "36px",
                      zIndex: 1,
                      fontSize: "20px",
                      color: "#666",
                      cursor: "pointer",
                    }}
                    onClick={handlePassageCalendarToggle}
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </span>
                  <DatePicker
                    selected={formik.values.memeberNoticeDate}
                    onChange={handlePassageDateSelect}
                    className={"form-control"}
                    open={isPassageCalendarOpen}
                    onClickOutside={() => setPassageCalendarOpen(false)}
                    onInputClick={handlePassageCalendarToggle}
                    maxDate={new Date()}
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
              </div>

              <div className="col">
                <div class="mb-3 " style={{ position: "relative" }}>
                  <label class="form-label">
                    Date of consideration of the Bill
                  </label>
                  <span
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "36px",
                      zIndex: 1,
                      fontSize: "20px",
                      color: "#666",
                    }}
                    onClick={handleConsiderationCalendarToggle}
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </span>
                  <DatePicker
                    selected={formik.values.dateOfConsiderationBill}
                    onChange={handleconsiderationDateSelect}
                    className={"form-control"}
                    open={isconsiderationDateCalendarOpen}
                    onClickOutside={() =>
                      setConsiderationDateCalendarOpen(false)
                    }
                    onInputClick={handleConsiderationCalendarToggle}
                    maxDate={new Date()}
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
              </div>

              <div className="form-group col">
                <label htmlFor="session" className="form-label">
                  Consideration in Session
                </label>
                <select
                  id="fkSessionMemberPassageId"
                  name="fkSessionMemberPassageId"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.fkSessionMemberPassageId}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {sessions &&
                    sessions.map((item) => (
                      <option value={item.id}>{item.sessionName}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* 4th card */}

  <div className="container-fluid mt-2">
    <div class="card mt-1">
      <div className="card-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <div class="mb-3 " style={{ position: "relative" }}>
                <label class="form-label">Date of Passage by Senate</label>
                <span
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "36px",
                    zIndex: 1,
                    fontSize: "20px",
                    color: "#666",
                  }}
                  onClick={handlePassageSenateCalendarToggle}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </span>
                <DatePicker
                  selected={formik.values.dateOfPassageBySenate}
                  onChange={handlePassageSenateDateSelect}
                  className={"form-control"}
                  open={isPassageSenateCalendarOpen}
                  onClickOutside={() => setPassageSenateCalendarOpen(false)}
                  onInputClick={handlePassageSenateCalendarToggle}
                  maxDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
            </div>

            <div className="col-3">
              <div class="mb-3 " style={{ position: "relative" }}>
                <label class="form-label">Date of Transmission to NA</label>
                <span
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "36px",
                    zIndex: 1,
                    fontSize: "20px",
                    color: "#666",
                  }}
                  onClick={handleTransmissionCalendarToggle}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </span>
                <DatePicker
                  selected={formik.values.dateOfTransmissionToNA}
                  onChange={handleTransmissionDateSelect}
                  className={"form-control"}
                  open={isTransmissionDateCalendarOpen}
                  onClickOutside={() => setTransmissionDateCalendarOpen(false)}
                  onInputClick={handleTransmissionCalendarToggle}
                  maxDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
            </div>

            <div className="col-3">
              <div class="mb-3 " style={{ position: "relative" }}>
                <label class="form-label">Date of Publish in the Gazette</label>
                <span
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "36px",
                    zIndex: 1,
                    fontSize: "20px",
                    color: "#666",
                    cursor: "pointer",
                  }}
                  // onClick={handleConsiderationCalendarToggle}
                  onClick={handleGazetteCalendarToggle}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </span>
                <DatePicker
                  selected={formik.values.dateOfPublishInGazette}
                  onChange={handleGazetteDateSelect}
                  className={"form-control"}
                  open={isGazetteCalendarOpen}
                  onClickOutside={() => setGazetteCalendarOpen(false)}
                  onInputClick={handleGazetteCalendarToggle}
                  maxDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
            </div>
            <div className="col-3">
              <div class="mb-3 " style={{ position: "relative" }}>
                <label class="form-label">Date of Assent by President</label>
                <span
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "36px",
                    zIndex: 1,
                    fontSize: "20px",
                    color: "#666",
                    cursor: "pointer",
                  }}
                  // onClick={handleConsiderationCalendarToggle}
                  onClick={handleAssentCalendarToggle}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </span>
                <DatePicker
                  selected={formik.values.dateOfAssentByThePresident}
                  onChange={handleAssentDateSelect}
                  className={"form-control"}
                  open={isAssentCalendarOpen}
                  onClickOutside={() => setAssentCalendarOpen(false)}
                  onInputClick={handleAssentCalendarToggle}
                  maxDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
            </div>

            {/* <div className="col-3">
            <div class="mb-3 " style={{ position: "relative" }}>
              <label class="form-label">Date of Passage by NA</label>
              <span
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "36px",
                  zIndex: 1,
                  fontSize: "20px",
                  color: "#666",
                }}
                onClick={handlePassageByNACalendarToggle}
              >
                <FontAwesomeIcon icon={faCalendarAlt} />
              </span>
              <DatePicker
                selected={formik.values.dateOfPassageByNA}
                onChange={handlePassageByNADateSelect}
                className={"form-control"}
                open={isPassageByNADateCalendarOpen}
                onClickOutside={() =>
                  setPassageByNADateCalendarOpen(false)
                }
                onInputClick={handlePassageByNACalendarToggle}
                maxDate={new Date()}
                dateFormat="dd-MM-yyyy"
              />
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* 5th card */}

  <div className="container-fluid mt-2">
    <div class="card mt-1">
      <div className="ms-3 mt-3">
        <h6 className="text-black">Bill Documents</h6>
      </div>
      <div className="card-body">
        <div className="container-fluid">
          <div className="row">
            <div className="">
              <div className="form-group">
                <label className="form-label" htmlFor="billDescription">
                  Document Description
                </label>
                <textarea
                  id="documentDiscription"
                  name="documentDiscription"
                  value={formik.values.documentDiscription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="mt-3 row">
            <div className="col-4">
              <div class="mb-3 " style={{ position: "relative" }}>
                <label class="form-label">Document Date</label>
                <span
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "36px",
                    zIndex: 1,
                    fontSize: "20px",
                    color: "#666",
                  }}
                  onClick={handleDocomentDateCalendarToggle}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </span>
                <DatePicker
                  selected={formik.values.documentDate}
                  onChange={handleDocumentDateSelect}
                  className={"form-control"}
                  open={isDocomentDateCalendarOpen}
                  onClickOutside={() => setDocomentDateCalendarOpen(false)}
                  onInputClick={handleDocomentDateCalendarToggle}
                  maxDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
            </div>

            <div className="form-group col-4">
              <label htmlFor="billType" className="form-label">
                Document Type
              </label>
              <select
                id="documentType"
                name="documentType"
                className="form-select"
                onChange={formik.handleChange}
                value={formik.values.documentType}
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="Message From NA">Message From NA</option>

                <option value="Bill">
                  Letter circulated to Members/Ministries under rule 118
                </option>
                <option value="Notice under rule 119">
                  Notice under rule 119
                </option>
                <option value="Referred to Standing Committee">
                  Referred to Standing Committee
                </option>
                <option value="Bill as introduced">Bill as introduced</option>
                <option value="Report">Report</option>
                <option value="Bill as Reported">Bill as Reported</option>
                <option value="Bill passed">Bill Passed</option>
                <option value="Message Transmitted to NA under rule 125">
                  Message Transmitted to NA under rule 125
                </option>
                <option value="Bill not Passed by senate with in 90 days">
                  Bill not Passed by senate with in 90 days
                </option>
                <option value="Bill sent for assent">
                  Bill sent for assent
                </option>
                <option value="Bill Returend by President">
                  Bill Returend by President
                </option>
                <option value="Sent for Gazette">Sent for Gazette</option>
                <option value="Published in the Gazette">
                  Published in the Gazette
                </option>
              </select>
            </div>

            {/* <div className="form-group col-4">
            <label htmlFor="fileInput" className="form-label">
              Choose File
            </label>
            <input
              className="form-control"
              type="file"
              accept=".pdf, .jpg, .jpeg, .png"
              id="file"
              name="file"
              onChange={(event) => {
                formik.setFieldValue(
                  "file",
                  event.currentTarget.files
                );
              }}
            />
          </div> */}
            <div className="form-group col-4">
              <label htmlFor="fileInput" className="form-label">
                Choose File
              </label>
              <input
                className="form-control"
                type="file"
                accept=".pdf, .jpg, .jpeg, .png"
                id="file"
                name="file"
                multiple
                onChange={(event) => {
                  formik.setFieldValue("file", event.currentTarget.files);
                }}
              />
            </div>
            {singleSenateBillData &&
              singleSenateBillData.billDocuments &&
              singleSenateBillData.billDocuments.map((doc) => (
                <div key={doc.id} className="document-section">
                  {doc.documentType && (
                    <div
                      className="document-type"
                      style={{
                        display: "flex",
                        color: "black",
                        alignItems: "center",
                      }}
                    >
                      <h6
                        style={{
                          display: "flex",
                          color: "black",
                          fontSize: "14px",
                          marginTop: "15px",
                        }}
                      >
                        {doc.documentType}
                      </h6>
                      <h6
                        style={{
                          display: "flex",
                          color: "black",
                          fontSize: "10px",
                          fontWeight: "bold",
                          marginTop: "15px",
                          marginLeft: "14px",
                        }}
                      >
                        {doc?.documentDate
                          ? moment(doc?.documentDate).format("DD-MM-YYYY")
                          : ""}
                      </h6>
                    </div>
                  )}
                  {doc.file?.map((file) => (
                    <div className="MultiFile-label mt-1" key={file.id}>
                      <a
                        className="MultiFile-remove"
                        style={{
                          marginRight: "10px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        // onClick={() =>
                        //   alert(
                        //     `File ID: ${file.id}, Document Type: ${doc.documentType}`
                        //   )
                        // }
                        onClick={() =>
                          hendleRemoveImage(doc?.documentType, file?.id)
                        }
                      >
                        x
                      </a>
                      <span
                        className="MultiFile-label"
                        title={file.path.split("/").pop()}
                      >
                        <span className="MultiFile-title">
                          <a
                            href={`${imagesUrl}${file.path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ cursor: "pointer" }}
                          >
                            {file.path.split("/").pop()}
                          </a>
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              ))}

            <div className="row mt-3">
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>;
