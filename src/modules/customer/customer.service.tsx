import axios from 'axios';
import { Customer } from './customer.type';

const baseUrl = 'http://localhost:3300/api';

export default class CustomerService {
    public static listCustomers = (success: any, error: any) => {
        axios.get(`${baseUrl}/customers`, {}).then((response) => success(response)).catch((exeption) => error(exeption));
    }

    public static orderDeliveries = (success: any, error: any) => {
        axios.get(`${baseUrl}/sortCustomers`, {}).then((response) => success(response)).catch((exeption) => error(exeption));
    }

    public static modifyCustomer = (changeType: string, data: Customer, success : any, error : any) => {
        if(changeType === 'create') {
            axios.post(`${baseUrl}/customers`, data, {}).then((response) => success(response)).catch((exeption) => error(exeption));
        } else {
            axios.put(`${baseUrl}/customers/${data.id}`, data, {}).then((response) => success(response)).catch((exeption) => error(exeption));
        }
    }

    public static getCustomer = (code: number,success : any, error : any) => {
        axios.get(`${baseUrl}/customers/${code}`, {}).then((response) => success(response)).catch((exeption) => error(exeption));
    }

    public static deleteCustomer = (code: number, success : any, error : any) => {
        axios.delete(`${baseUrl}/customers/${code}`, {}).then((response) => success(response)).catch((exeption) => error(exeption));
    }
}