import ticketDao from "../dao/ticket.dao.js";

const createTicket = async (userEmail, totalCart) => {
    const newTicket = {
        amount: totalCart,
        purchaser: userEmail,
        code: Math.random().toString(36).substr(2, 9),
    };
    
    const ticket = await ticketDao.create(newTicket);
    return ticket;
};

export default { createTicket };