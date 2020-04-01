import { Component } from '@angular/core';
import { ipcRenderer} from 'electron';
import { } from 'electron';
//import Fs from 'fs';
const items = require('./items')

const electron = (<any>window).require('electron');
const ipc = electron.ipcRenderer;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'angularElectronReadit';

  // Dom Nodes
showModal = document.getElementById('show-modal')
closeModal = document.getElementById('close-modal')
modal = document.getElementById('modal')
addItem = document.getElementById('add-item')
itemUrl = document.getElementById('url')
search = document.getElementById('search')

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
}
onAdd(){
   console.log('+ clicked'),
   document.getElementById("modal").style.display = "flex";
   document.getElementById("url").focus();
  //this.modal.style.display = 'flex'
}
onClose(){
  document.getElementById("modal").style.display = "none";
  //this.modal.style.display = 'none'
  }

onAddURL(){
    var value = (document.getElementById("url") as HTMLInputElement).value
    console.log(value)

    //send new item url to main process
    //ipc = electron.ipcRenderer

    ipc.on('from-main-to-renderer',(e,newItem) => {
      console.log(newItem);
 })

    ipc.send('url-to-main',value)
    //this.listenFromMain()


  //  listenFromMain(){
  //       //listen for new item from main process
  //       ipc.on('from-main-to-renderer',(e,newItem) => {
  //         console.log(newItem);
  //       })
   }

   //listen for new item from main process
   onSearch(){

   }
}
