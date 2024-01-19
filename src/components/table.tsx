import React from "react";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Modal, ModalTypeGet} from "./modal";

const Table = (props: any) => {
    const entity = props.entity;
    const dataList = props.dataList;
    const loadAction = props.loadAction;
    const deleteAction = props.deleteAction;

    //Controladorres do modal
    const [activeModal, setActiveModal] = useState(false);
    const [modal, setModal] = useState({
        action: "",
        confirm: false,
        model: null,
        service: null
    } as ModalTypeGet);

    const [selectedPage, setSelectedPage] = useState(0);
    const [filterValue, setFilterValue] = useState('');
    
    function search(e: any) {
        e.preventDefault();
        loadAction(render)
    }

    function filterData(data: Array<any> = []) {
        if(filterValue && filterValue !== '') {
           return data.filter(
                (item) => {
                    //Filtro por Nome
                    if(item.name.toUpperCase().includes(filterValue.toUpperCase())) {
                        return item;

                    }

                    //Filtro por E-mail
                    if(item.email.toUpperCase().includes(filterValue.toUpperCase())) {
                        return item;
                    }

                    //Filtro por Telefone
                    if(item.phone.toUpperCase().includes(filterValue.toUpperCase())) {
                        return item;
                    }
                }
            )
        }
        return data;
    }

    function removeData(data: any) {
        setModal({
            action: "delete",
            confirm: false,
            model: { entity: entity, object: data},
            service: deleteAction
        });
        setActiveModal(true);
    }

    function getHeader(objt: any) {
        if(objt && objt.length > 0){
            return Object.keys(objt[0]);
        }
        return [];
    }

    function getLabelColumn(column: string) {
        const value = entity.columns[column];
        if(value) {
            return value;
        }

        return null;
    }

    function render(objt: Array<any> = []) {
        const data: any = [];
        if(objt && objt.length > 0){
            let currentPage = 0;
            //Filtra dados de acordo com o filtro utilizado
            objt = filterData(objt);
            //Organiza em guias
            for (let i = 0; i < objt.length; i++) {
                const item: any = objt[i];
                if(data[currentPage] === undefined) {
                    data[currentPage] = [];
                }
                data[currentPage].push(item);
                if(i > 0 && (i +1) % 10 === 0) {
                    currentPage++;
                }
            }
            return data;
        }
    }

    function getPage(data: Array<any> = [], page : number, update: boolean) {
        if(data && data.length > 0){
            if(page > -1 && page !== selectedPage && update && (page +1) <= dataList.length) {
                setSelectedPage(page);
            }
            return data[page];
        }

        return [];
    }

    useEffect(() => {
        loadAction(render);
    }, [activeModal, selectedPage]);

    return <>
        <Modal data={modal} active={activeModal} setActive={setActiveModal} />
        <div className="column table-component">
            <div className="columns">
                <div className="column">
                    <form onSubmit={search}>
                        <div className="field has-addons">
                            <p className="control">
                                <input className="input" type="text" placeholder="Pesquisar" onChange={e => setFilterValue(e.target.value) }/>
                            </p>
                            <p className="control">
                                <button className="button" type="submit">
                                    <i className="fa fa-search"/>
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="column">
                    <Link className="button ma-table-right-button" to="/customer/add">
                        <span className="icon is-small">
                            <i className="fa fa-plus" />
                        </span>
                        <span className="is-hidden-touch">Criar</span>
                    </Link>
                </div>
            </div>
            <table id="customer-table" className="table is-striped is-hoverable is-fullwidth">
                <thead>
                <tr>
                    {
                        getHeader(getPage(dataList, selectedPage, false)).map((column:string, key: number) => {
                            const columnName = getLabelColumn(column);
                            if(columnName) {
                                return <td key={key}>{columnName}</td>;
                            }
                        })
                    }
                    <th>Ação</th>
                </tr>
                </thead>
                <tbody>
                {
                    getPage(dataList, selectedPage, false).map((data: any, key: number) => {
                        return <tr key={key}>
                                {
                                    getHeader(getPage(dataList, 0, false)).map((column:string, key: number) => {
                                        //TODO: Adicionar também campos com data
                                        if(!['description', 'deleted_at'].includes(column)) {
                                            if(!column.includes('json')) {
                                                if(column === 'id') {
                                                    return (
                                                        <td key={key}>#{data[column]}</td>
                                                    );
                                                }
                                                else if(column === 'active') {
                                                    return (
                                                        <td key={key}>{data[column] ? 'Sim' : 'Não'}</td>
                                                    );
                                                } else {
                                                    return (
                                                        <td key={key}>{data[column]}</td>
                                                    );
                                                }
                                            }
                                        }
                                    })
                                }
                                <td>
                                    <a className="button is-danger" onClick={() => {removeData(data)}} style={{marginRight: "3px"}}>
                                        <span className="icon is-small">
                                            <i className="fa fa-trash" />
                                        </span>
                                        <span className="is-hidden-touch">Remover</span>
                                    </a>
                                    <Link className="button is-warning" to={`/${entity.caller}/edit/${data.id}`}>
                                        <span className="icon is-small">
                                            <i className="fa fa-pencil" />
                                        </span>
                                        <span className="is-hidden-touch">Alterar</span>
                                    </Link>
                                </td>
                            </tr>;
                    })
                }
                </tbody>
            </table>
            <nav className="pagination" role="navigation" aria-label="pagination">
                <a className="pagination-previous is-disabled" onClick={() => getPage(dataList, selectedPage-1, true)}>Anterior</a>
                <a className="pagination-next" onClick={() => getPage(dataList, selectedPage+1, true)}>Próxima</a>
                <ul className="pagination-list">
                    {
                        dataList.map((page: number, key: number) => {
                            return (
                              <li key={key}>
                                  <a className={`pagination-link ${key === selectedPage ? 'is-current' : '' }`} onClick={() => getPage(dataList, key, true)} aria-label={`Page ${key}`} aria-current="page">{key+1}</a>
                              </li>
                            );
                        })
                    }
                </ul>
            </nav>
        </div>
    </>;
};

export default Table