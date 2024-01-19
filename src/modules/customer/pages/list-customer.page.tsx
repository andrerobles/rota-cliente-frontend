import React from "react";
import moment from "moment";
import CustomerService from "../customer.service";
import { useState } from "react";
import Table from "../../../components/table";
import { Customer } from '../customer.type';
import ListDeliveryCustomerPage from "./list-delivery-customer.page";
import CustomLoader from "../../../components/CustomLoader";

const ListCustomerPage = () => {

    const initialState: Customer[] = [];
    const [customerList, setCustomerList] = useState(initialState);

    const entity = {
        name: ['Cliente', 'cliente'],
        caller: 'customer',
        columns: {
            id: 'Id',
            name: 'Nome',
            email: 'E-mail',
            phone: 'Telefone',
            locationtext: 'Localização',
            created_at: 'Dt. Criação',
            updated_at: 'Dt. Alteração'
        }
    };

    //Modal de lista de rotas
    const [deliveryModal, setDeliveryModal] = useState(false);

    const [loading, setLoading] = useState(true);

    const loadPage = (callBack: any) => {
        CustomerService.listCustomers((response: any) => {
            if (response) {
                const { data } = response;
                if (data && data.length > 0) {
                    data.forEach((item: Customer) => {
                        if (item.locationjson) {
                            item.locationtext = `(${item.locationjson.x},${item.locationjson.y})`;
                            item.locationjson = undefined;
                            item.created_at = moment(item.created_at).format("DD/MM/YYYY HH:mm:ss");
                            item.updated_at = moment(item.updated_at).format("DD/MM/YYYY HH:mm:ss");
                        }
                    });
                }

                setCustomerList(callBack(data));

                //Adicionado um timeout ficticio
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        }, (exception: any) => {
            console.log(exception?.message);
        });
    }

    return (
        <div className="column">
            <div style={{ visibility: loading ? "hidden" : "inherit" }}>
                <div className="columns">
                    <div className="column">
                        <div className="column">
                            <a className="button ma-table-right-button" onClick={() => setDeliveryModal(true)}>
                                <span className="icon is-small">
                                    <i className="fa fa-map" />
                                </span>
                                <span className="is-hidden-touch">Rota</span>
                            </a>
                        </div>
                    </div>
                </div>
                <ListDeliveryCustomerPage deliveryModal={deliveryModal} setDeliveryModal={setDeliveryModal} />
                <Table dataList={customerList} entity={entity} loadAction={loadPage} deleteAction={CustomerService.deleteCustomer} />
            </div>

            <CustomLoader visible={loading} left={"50%"} />
        </div>


    );
};

export default ListCustomerPage;