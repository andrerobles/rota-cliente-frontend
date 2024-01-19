import React, { useEffect, useState } from "react";
import CustomLoader from "../../../components/CustomLoader";
import CustomerService from "../customer.service";
import { Customer } from "../customer.type";

const ListDeliveryCustomerPage = (props: any) => {
    const initialState: Customer[] = [];
    const [deliveryList, setDeliveryList] = useState(initialState);

    const [loading, setLoading] = useState(true);

    const close = () => {
        props.setDeliveryModal(false);
    }

    const loadPage = () => {
        setLoading(true);
        CustomerService.orderDeliveries((response: any) => {
            if (response) {
                const { data } = response;
                setDeliveryList(data);
                //Adicionado um timeout ficticio
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        }, (error: any) => {
            console.log(`Erro ao listar clientes: ${JSON.stringify(error)}`)
        });
    }

    useEffect(() => {
        loadPage();
    }, [props.deliveryModal]);

    return (
        <>
            <div className={`modal ${props.deliveryModal ? 'is-active' : ''}`}>
                <div className="modal-card" style={{ width: "800px" }}>
                    <header className="modal-card-head">
                        <p className="modal-card-title">Rota otimizada</p>
                        <button className="delete" onClick={close} aria-label="close" />
                    </header>
                    <section className="modal-card-body">
                        <div style={{ visibility: loading ? "hidden" : "inherit" }}>
                            <div className="column table-component">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th title="id">Id</th>
                                            <th title="nome">Nome</th>
                                            <th title="email">E-mail</th>
                                            <th title="telefone">Telefone</th>
                                            <th title="localizacao">Localização</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            deliveryList.map((row, key) => {
                                                if (row.locationjson) {
                                                    row.locationtext = `(${row.locationjson.x},${row.locationjson.y})`;
                                                }

                                                return (
                                                    <tr key={key}>
                                                        <td>#{row.id}</td>
                                                        <td>{row.name}</td>
                                                        <td>{row.email}</td>
                                                        <td>{row.phone}</td>
                                                        <td>{row.locationtext}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <CustomLoader visible={loading} left={"40%"} />
                    </section>
                    <footer className="modal-card-foot">
                        <button className={"button is-primary"} onClick={close}>Fechar</button>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default ListDeliveryCustomerPage;