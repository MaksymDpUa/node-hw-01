const contacts = require("./contacts");

const { Command } = require("commander");


const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await contacts.getAllContacts();
      return contactList; 

    case "get":
      const contact = await contacts.getContactById(id);
      return contact;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return newContact;

    case "remove":   
      const deletedContact = await contacts.removeContact(id);
      return deletedContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv)
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
