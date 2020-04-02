import { Component } from '@angular/core';
import { ipcRenderer, remote } from 'electron';
import {} from 'electron';
//import Fs from 'fs';
const items = require('./items');

const electron = (<any>window).require('electron');
const ipc = electron.ipcRenderer;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Dom Nodes
  showModal = document.getElementById('show-modal');
  closeModal = document.getElementById('close-modal');
  modal = document.getElementById('modal');
  addItem = document.getElementById('add-item');
  itemUrl = document.getElementById('url');
  search = document.getElementById('search');

  //Disable and enable modal buttons
  toggleModalButtons = () => {
    // Check state of buttons
    //  if (addItem.disabled === true) {
    //   addItem.disabled = false
    //   addItem.style.opacity = 1
    //   addItem.innerText = 'Add Item'
    //   closeModal.style.display = 'inline'
    // } else {
    //   addItem.disabled = true
    //   addItem.style.opacity = 0.5
    //   addItem.innerText = 'Adding...'
    //   closeModal.style.display = 'none'
    // }
  };
  onAdd() {
    console.log('+ clicked'),
      (document.getElementById('modal').style.display = 'flex');
    document.getElementById('url').focus();
    //this.modal.style.display = 'flex'
  }
  onClose() {
    document.getElementById('modal').style.display = 'none';
    //this.modal.style.display = 'none'
  }

  addToList(item) {
    let items = document.getElementById('items')

    // Create a new DOM node
    let itemNode = document.createElement('div')

    // Assign "read-item" class
    itemNode.setAttribute('class', 'read-item')

    // Set item url as data attribute
    itemNode.setAttribute('data-url', item)

    // Add inner HTML
    itemNode.innerHTML = `<h2>${item}</h2>`

    // Append new node to "items"
    items.appendChild(itemNode)
  }

  onAddURL() {
    console.log('caled addUrl');

    var value = (document.getElementById('url') as HTMLInputElement).value;
    console.log(value);

    ipc.send('to-main', value);
    ipc.once('to-renderer', (e, args) => {
      // e.preventDefault();
      console.log('asasasasasasasas: ', e, args, typeof(args));
      this.addToList(args);
    });
  }
  //listen for new item from main process
  onSearch() {
    console.log('in onSearch');
  }
}
