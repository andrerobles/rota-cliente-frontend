import React, {useContext} from "react";
import {useEffect, useState} from "react";
import Alert from "./alert";
import {useNavigate} from "react-router";

type ModalServiceChange = (arg0: string, arg1: any ,arg2: () => void, arg3: () => void) => void;
type ModalServiceGet = (arg0: number, arg1: () => void, arg2: () => void) => void;
export type Model = { entity: any, object: any }

export interface ModalTypeGet {
    action: string,
    confirm: boolean,
    model: Model | null,
    service: ModalServiceGet | null
}

export interface ModalTypeChange {
    action: string,
    confirm: boolean,
    model: Model | null,
    service: ModalServiceChange | null
}

export const Modal = (props: any) => {
    const navigate = useNavigate();
    const active = props.active;
    const data = props.data;

    const [actionText, setActionText] = useState('');
    const [actionCss, setActionCss] = useState('');

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const [actionAlert, setActionAlert] = useState('no-action');
    const [resultAlert, setResultAlert] = useState('');


    function close() {
        props.setActive(false);
    }

    function configureAlert(result: string, action: string) {
        setResultAlert(result);
        setActionAlert(action);
        props.setActive(false);
    }

    function confirm() {
        switch (data.action) {
            case 'delete':
                data.service(data.model.object.id, (response: any) => {
                    configureAlert('success', data.action);
                }, (error: any) => {
                    configureAlert('error', data.action);
                });
                break;
            case 'reload':
                data.service('edit', data.model.object, (response: any) => {
                    navigate("/", { replace: true });
                    navigate(0);
                }, (error: any) => {
                    configureAlert('error', 'edit');
                });
                break;
            default:
                data.service(data.action, data.model.object, (response: any) => {
                    configureAlert('success', data.action);
                }, (error: any) => {
                    configureAlert('error', data.action);
                });
        }
    }

    function configureModal() {

        switch (data.action) {
            case 'create':
                setActionText('Criar');
                setActionCss('is-success');
                setTitle(`Criar ${data.model.entity.name[0]}`);
                setBody(`Tem certeza que deseja criar o ${data.model.entity.name[1]} ${data.model.object.name}?`)
                break;
            case 'edit':
                setActionText('Editar');
                setActionCss('is-warning');
                setTitle(`Editar ${data.model.entity.name[0]}`)
                setBody(`Tem certeza que deseja editar o ${data.model.entity.name[1]} ${data.model.object.name}?`)
                break;
            case 'reload':
                setActionText('Modificar');
                setActionCss('is-warning');
                setTitle(`Modificar ${data.model.entity.name[0]}`)
                setBody(`Tem certeza que deseja modificar a ${data.model.entity.name[1]} de ${data.model.object.name}?`)
                break;
            case 'delete':
                setActionText('Remover');
                setActionCss('is-danger');
                setTitle(`Remover ${data.model.entity.name[0]}`)
                setBody(`Tem certeza que deseja remover o ${data.model.entity.name[1]} ${data.model.object.name}?`)
                break;
            default:
                setActionText('Ok');
                setActionCss('is-primary');
                setTitle('Confirmação');
                setBody('Proceder com a ação?');
        }
    }
    
    useEffect(() => {
       configureModal();
    }, [data, active]);

    return (
        <>
            { data.model && <Alert entity={data.model.entity}
                   action={actionAlert}
                   setAction={setActionAlert}
                   result={resultAlert}
            /> }
            <div className={`modal ${active ? 'is-active' : ''}`}>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{title}</p>
                        <button className="delete" onClick={close} aria-label="close"/>
                    </header>
                    <section className="modal-card-body">
                        {body}
                    </section>
                    <footer className="modal-card-foot">
                        <button className={`button ${actionCss}`} onClick={confirm}>{actionText}</button>
                        <button className="button" onClick={close}>Cancel</button>
                    </footer>
                </div>
            </div>
        </>
    );
};