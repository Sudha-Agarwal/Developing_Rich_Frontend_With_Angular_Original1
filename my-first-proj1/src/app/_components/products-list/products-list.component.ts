import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product.model';
import { ProductService } from 'src/app/_services/product.service';
declare var bootstrap: any;



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit  {
  products:Product[]=[];
  selectedProduct:Product = new Product();
  showEditProduct:boolean = false;
  showAddProduct:boolean = false;
  modalElement!:HTMLElement;
  modal:any;



  constructor(private productService:ProductService){}
 
  ngOnInit(): void {    
    this.productService.getProduct().subscribe({
      next:data=>this.products = data,
      error:error=>console.log(error),
      complete:()=> console.log('complete')
    })  
    
  }

  //JSON data
  /*products:Product[] = [
    {id:1, name:'Product1',description:'Description1', visible:true, stock:10},
    {id:2, name:'Product2',description:'Description2', visible:true, stock:0}    
  ];*/

  isVisible:boolean = false;

  isProductInStock(product:Product){
    return product.stock > 0;
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: data=> {alert(data.message);
          this.ngOnInit();
        },
        error:error=> alert(error.message)
      });
      //this.products = this.products.filter(p => p.id !== id);
    }
  }

  showDetails(product:Product) {
    this.selectedProduct=Object.assign({},product)
    this.showEditProduct = true;
    this.modalElement = document.getElementById('editProductModal');
    console.log(this.modalElement); // Add this line for debugging
    if (this.modalElement) {
      this.modal = new bootstrap.Modal(this.modalElement);
    } else {
      console.error('Modal element not found!');
    }
    this.modal.show();
  }
  update(product:Product) {
    console.log(product);
    var target=this.products.find(e => e.id==product.id)
    Object.assign(target,product);
    this.showEditProduct = false;
    /*const modalElement = document.getElementById('editProductModal');
    const modal = new bootstrap.Modal(modalElement);*/
    this.modal.hide();
    alert("Product Saved");
    this.ngOnInit();

  }

  cancelUpdate(){
    this.showEditProduct = false;    
    this.modal.hide();
    this.ngOnInit();
  }

  addNewProduct(){
    this.showAddProduct = true;
    this.modalElement = document.getElementById('addProductModal');
    console.log(this.modalElement); // Add this line for debugging
    if (this.modalElement) {
      this.modal = new bootstrap.Modal(this.modalElement);
    } else {
      console.error('Modal element not found!');
    }
    this.modal.show();
  }

  added(product:Product){
    this.showAddProduct = false;
    this.modal.hide();
    this.ngOnInit();


  }
  cancelAdd(){
    this.showAddProduct = false;
    this.modal.hide();
  }

  

}
