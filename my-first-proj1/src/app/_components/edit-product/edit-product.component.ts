import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/_models/product.model';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  @Input() product:Product;
  @Output() productChange:EventEmitter<Product> =new EventEmitter<Product>(); 
  @Output() cancelUpdate: EventEmitter<void> = new EventEmitter<void>();
  constructor(private productService:ProductService){}
  update() {
    this.productService.updateProduct(this.product).subscribe({
      next:data=>{
        // Notify the parent component
        this.productChange.emit(this.product);
        alert("Product updated")
      } ,
      error: err=>alert(err),
      complete:()=>console.log("done")
    });     
    
    //this.productChange.emit(this.product);
  }

  onCancelUpdate() {
    // Emit the cancel event to notify the parent component
    this.cancelUpdate.emit();
  }

}
