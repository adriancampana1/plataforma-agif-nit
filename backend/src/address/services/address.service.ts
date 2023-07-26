import { InsertOneResult } from "mongodb";
import { ServiceResponse } from "../../utils/types/service.response";
import Address from "../models/address";
import axios from "axios";
import { ViaCepResponse } from "../types/responses";

export default class AddressService {

  constructor() { }

  async createAddress(address: Address): Promise<ServiceResponse<InsertOneResult<Document> | undefined>> {
    try {
      address.zip_code = address.zip_code.replace(/\D/g, '');

      if (address.zip_code.length !== 8)
        return {
          statusCode: 400,
          message: 'The zip code must have 8 digits.',
        }
        
      if (isNaN(address.number))
        return {
          statusCode: 400,
          message: 'The number field must be a number.',
        }
        
      address.number = Number(address.number)
      
      const addressExists = await this.searchAddress(address);
      
      if (!addressExists)
        return {
          statusCode: 400,
          message: 'Invalid zip code.',
        }
      
      address.street = addressExists.logradouro;
      address.district = addressExists.bairro;
      address.city = addressExists.localidade;

      const createdAddress = await address.createAddress();

      return {
        statusCode: 201,
        message: 'Address created successfully.',
        data: createdAddress,
      }
    } catch (error: any) {
      console.log(error);
      return {
        statusCode: 500,
        message: 'An error occurred while creating the address.',
      }
    }
  }

  private async searchAddress(address: Address): Promise<ViaCepResponse | undefined> {
    try {
      const response = await axios.get('https://viacep.com.br/ws/' + address.zip_code + '/json/');
      return response.data;
    } catch (error) {
      console.log('Error while searching address on Viacep');
      return undefined;
    }
  }

}

