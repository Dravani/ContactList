import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import "./App.css";
import ContactForm from "./ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [ismodelOpen, setIsmodelOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  const closemodel = () => {
    setIsmodelOpen(false)
    setCurrentContact({})
  }

  const openCreatemodel = () => {
    if (!ismodelOpen) setIsmodelOpen(true)
  }

  const openEditmodel = (contact) => {
    if (ismodelOpen) return
    setCurrentContact(contact)
    setIsmodelOpen(true)
  }

  const onUpdate = () => {
    closemodel()
    fetchContacts()
  }

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditmodel} updateCallback={onUpdate} />
      <button onClick={openCreatemodel}>Create New Contact</button>
      {ismodelOpen && <div className="model">
        <div className="model-content">
          <span className="close" onClick={closemodel}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
        </div>
      </div>
      }
    </>
  );
}

export default App;