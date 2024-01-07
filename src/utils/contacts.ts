import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by"
import { contact } from "../@types/contact";

export async function getContacts(query?: string | null): Promise<contact[]> {
  await fakeNetwork(`getContacts:${query}`);

  let contacts: contact[] | null = await localforage.getItem("contacts");

  if (!contacts) contacts = [];

  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }

  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  await fakeNetwork();

  let id = Math.random().toString(36).substring(2, 9);
  let contact = { id, createdAt: Date.now() };

  let contacts: contact[] = await getContacts();

  contacts.unshift(contact);

  await set(contacts);

  return contact;
}

export async function getContact(id: string) {
  await fakeNetwork(`contact:${id}`);

  let contacts: contact[] | null = await localforage.getItem("contacts");
  let contact = contacts?.find(contact => contact.id === id);

  return contact ?? null;
}

export async function updateContact(id: string, updates: contact) {
  await fakeNetwork();

  let contacts: contact[] | null = await localforage.getItem("contacts");
  let contact = contacts?.find(contact => contact.id === id);
  if (!contact) 
    throw new Error("No contact found for id:" + id);

  Object.assign(contact, updates);

  if (contacts?.length)
    await set(contacts);

  return contact;
}

export async function deleteContact(id: string) {
  let contacts: contact[] | null = await localforage.getItem("contacts");
  let index = contacts?.findIndex(contact => contact.id === id);

  if (!index) 
    throw new Error("No contact found for id:" + id);

  if (index > -1) {
    contacts?.splice(index, 1);

    if (contacts?.length)
      await set(contacts);

    return true;
  }

  return false;
}

function set(contacts: contact[]) {

  return localforage.setItem("contacts", contacts);

}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: any = {};

async function fakeNetwork(key?: string) {
  if (key === undefined)
    return;

  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}
