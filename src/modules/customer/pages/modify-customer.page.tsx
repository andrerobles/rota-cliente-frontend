import React, { useState, useEffect } from "react";
import CustomerService from "../customer.service";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, ModalTypeChange } from "../../../components/modal";
import { Customer } from '../customer.type';
import InputMask from 'react-input-mask';

const ModifyCustomerPage = (props: any) => {
    const [entity] = useState({ name: ['Cliente', 'cliente'] });
    const changeType: string = props.changeType;
    const navigate = useNavigate();

    // Controladores do modal
    const [activeModal, setActiveModal] = useState(false);
    const [modal, setModal] = useState({
        action: "",
        confirm: false,
        model: null,
        service: null
    } as ModalTypeChange);

    const [customer, setCustomer] = useState<Customer>({
        id: undefined,
        name: '',
        email: '',
        phone: '',
        locationjson: { x: 0, y: 0 },
        locationtext: '',
        created_at: undefined,
        updated_at: undefined,
        deleted_At: undefined
    });

    const { codeParam } = useParams();

    useEffect(() => {
        if (changeType === 'edit') {
            CustomerService.getCustomer(Number(codeParam), (response: any) => {
                const { data } = response;
                setCustomer({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    locationjson: data.locationjson,
                    locationtext: '',
                    created_at: undefined,
                    updated_at: undefined,
                    deleted_At: undefined
                });
            }, (error: any) => {
                console.log(error?.message);
            });
        }
    }, [changeType, codeParam]);

    function handlePhone(value: string) {
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            phone: value.replace(/_/g, '')
        }));
    }

    function handleEmail(value: string) {
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            email: value
        }));
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const data = {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            locationjson: customer.locationjson
        } as Customer;

        setModal({
            action: changeType,
            confirm: false,
            model: { entity: entity, object: data },
            service: CustomerService.modifyCustomer
        });
        setActiveModal(true);
    }

    return (
        <>
            <Modal data={modal} active={activeModal} setActive={setActiveModal} />
            <div className="column">
                <h1 className='title'>{changeType === 'edit' ? 'Modificar' : 'Criar'} cliente</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">Nome</label>
                        <p className="control">
                            <input
                                className="input"
                                id="name"
                                type="text"
                                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                value={customer.name}
                                placeholder="Nome"
                            />
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <p className="control">
                            <input
                                className="input"
                                id="email"
                                type="text"
                                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                value={customer.email}
                                placeholder="Email"
                            />
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Telefone</label>
                        <p className="control">
                            <InputMask
                                className="input"
                                id="phone"
                                type="text"
                                mask="+55 99 9999-9999"
                                maskChar="_"
                                value={customer.phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePhone(e.target.value)}
                                placeholder="Telefone"
                            />
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Coordenada X</label>
                        <p className="control">
                            <input
                                className="input"
                                type="number"
                                id="locationX"
                                min="0"
                                max="999"
                                onChange={(e) => setCustomer({ ...customer, locationjson: customer.locationjson ? { ...customer.locationjson, x: Number(e.target.value) } : undefined })}
                                value={customer.locationjson ? customer.locationjson.x : undefined}
                                placeholder="Coordenada X"
                            />
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Coordenada Y</label>
                        <p className="control">
                            <input
                                className="input"
                                type="number"
                                id="locationY"
                                min="0"
                                max="999"
                                onChange={(e) => setCustomer({ ...customer, locationjson: customer.locationjson ? { ...customer.locationjson, y: Number(e.target.value) } : undefined })}
                                value={customer.locationjson ? customer.locationjson.y : undefined}
                                placeholder="Coordenada Y"
                            />
                        </p>
                    </div>
                    <div className='field'>
                        <button className="button is-primary" onClick={() => navigate(-1)} style={{ marginRight: "3px" }}>
                            <span className="icon is-small">
                                <i className="fa fa-arrow-rotate-left" />
                            </span>
                            <span>Voltar</span>
                        </button>
                        <button className="button is-success" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ModifyCustomerPage;
