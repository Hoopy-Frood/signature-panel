import { Component, Input, ViewChild, OnInit, HostListener } from '@angular/core';


@Component({
  selector: 'app-signature-panel',
  templateUrl: './signature-panel.component.html',
  styleUrls:   ['./signature-panel.component.scss']
})
export class SignaturePanel implements OnInit {
  @Input() name: string;
  @ViewChild('sigPad', {static: true}) sigPad;
  sigPadElement;
  context;
  isDrawing = false;
  img: string;  

  ngOnInit() {
    this.sigPadElement = this.sigPad.nativeElement;
    this.context = this.sigPadElement.getContext('2d');
    this.context.strokeStyle = '#3742fa';
  }


  @HostListener('document:mouseup', ['$event'])
  
  onMouseUp(e) {
    this.isDrawing = false;
  }

  onMouseDown(e) {
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  onMouseMove(e) {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  
  private relativeCoords(event) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return { x: x, y: y };
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchEnd(e) {
    console.log("touchend");
    this.isDrawing = false;
  }

  onTouchStart(e) {
    e.preventDefault();
    console.log("touchStart");
    this.isDrawing = true;
    const coords = this.relativeTouchCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  onTouchMove(e) {
    e.preventDefault();
    const coords = this.relativeTouchCoords(e);
    this.context.lineTo(coords.x, coords.y);
    this.context.stroke();
  }

  private relativeTouchCoords(event) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.touches[0].clientX - bounds.left;
    const y = event.touches[0].clientY - bounds.top;
    return { x: x, y: y };
  }


  clear() {
    this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    this.context.beginPath();
  }

  save() {
    this.img = this.sigPadElement.toDataURL("image/png");
    console.log(this.img);
  }

}