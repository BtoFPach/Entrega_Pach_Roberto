import { ticketModel } from "../models/ticket.model.js";

export default class TicketDao {
  getAll = async (query, options) => {
    try {
      const tickets = await ticketModel.paginate(query, options);
      return tickets;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getById = async (id) => {
    try {
      const ticket = await ticketModel.findById(id);
      return ticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  create = async (data) => {
    try {
      const ticket = await ticketModel.create(data);
      return ticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  update = async (id, data) => {
    try {
      const ticketUpdate = await ticketModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return ticketUpdate;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  deleteOne = async (id) => {
    try {
      const ticket = await ticketModel.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
      );
      return ticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
