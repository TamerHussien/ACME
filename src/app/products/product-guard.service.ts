import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';

@Injectable()

export class ProductEditingGuard implements CanDeactivate<ProductEditComponent> {
    canDeactivate(component: ProductEditComponent):boolean {
        if (component.isDirty) {
            let productName = component.product.productName || 'New Product';

            return confirm(`Navigate away and lose all changes to ${productName}?`);
        }
        return true;
    }
}