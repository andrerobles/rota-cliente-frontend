import React from "react";
import {useEffect, useState} from "react";

const Alert = (props: any) => {
    const entity = props.entity;
    const action = props.action; //(create, edit, delete, no-action)
    const result = props.result; //(success, error)


    const [message, setMessage] = useState('');
    const [classText, setClassText] = useState('is-primary');

    function closeAlert() {
        props.setAction('no-action');
    }

    useEffect(() => {
        switch (action) {
            case 'create':
                if(result === 'success') {
                    setMessage(entity.name[0] + ' criado com sucesso!');
                    setClassText('is-success is-light');
                } else {
                    setMessage('Falha ao criar ' + entity.name[1])
                    setClassText('is-danger is-light');
                }
                break;
            case 'edit':
                if(result === 'success') {
                    setMessage(entity.name[0] + ' alterado com sucesso!');
                    setClassText('is-success is-light');
                } else {
                    setMessage("Falha ao alterar " + entity.name[1]);
                    setClassText('is-danger is-light');
                }
                break;
            case 'delete':
                if(result === 'success') {
                    setMessage(entity.name[0] + ' deletar com sucesso!')
                    setClassText('is-success is-light');
                } else {
                    setMessage('Falha ao deletar ' + entity.name[1])
                    setClassText('is-danger is-light');
                }
                break;
        }
    }, [action, result]);

    if(action !== 'no-action') {
        return (
            <div className={`notification ${classText}`}>
                <button className="delete" onClick={closeAlert} />
                {message}
            </div>
        );
    } else {
        return (
            <></>
        );
    }


};

export default Alert;