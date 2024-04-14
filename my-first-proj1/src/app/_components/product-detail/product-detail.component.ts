import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  productId:string;

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');

    //with query parameter
    this.route.queryParams.subscribe(params => {
      // Access the query parameters here
      this.productId = params['id'];
      // Do something with the query parameter, such as fetching data based on the ID
    });
  }

  navigateToProducts(){
    this.router.navigate(['/products']);
  }

}
