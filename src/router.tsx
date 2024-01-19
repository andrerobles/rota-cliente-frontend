import React from "react";
import { Routes, Route } from "react-router-dom";
import ListCustomerPage from "./modules/customer/pages/list-customer.page";
import ModifyCustomerPage from "./modules/customer/pages/modify-customer.page";

const Router = () => {
    return (
        <section className="main-content columns is-fullheight">
            <div className={"column"}>
                <Routes>
                    {/*Cliente*/}
                    <Route path="/" element={<ListCustomerPage />} />
                    <Route path="/customer/add" element={<ModifyCustomerPage changeType="create" />} />
                    <Route path="/customer/edit/:codeParam" element={<ModifyCustomerPage changeType="edit" />} />
                </Routes>
            </div>
        </section>
    )
}

export default Router;