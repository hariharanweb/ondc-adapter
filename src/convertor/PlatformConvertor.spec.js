import {
  it, expect, describe,
} from 'vitest';
import PlatformConvertor from './PlatformConvertor';

describe('PlatformConvertor', () => {
  it('should convert platform items to ondc items according to given config', async () => {
    const platformResponseItem = [
      {
        id: 52,
        name: 'T-shirt',
        slug: 'hoodie-with-logo-2',
        permalink: 'https://woo-freely-maximum-nacho.wpcomstaging.com/product/hoodie-with-logo-2/',
        date_created: '2023-03-09T12:48:06',
        date_created_gmt: '2023-03-09T07:18:06',
        date_modified: '2023-03-09T12:53:10',
        date_modified_gmt: '2023-03-09T07:23:10',
        type: 'simple',
        status: 'publish',
        featured: false,
        catalog_visibility: 'visible',
        description: '<p><img class="alignnone size-medium wp-image-53" src="https://woo-freely-maximum-nacho.wpcomstaging.com/wp-content/uploads/2023/03/tshit-240x300.webp" alt="" width="240" height="300" /></p>\n',
        short_description: '<p>Hoodie in sweatshirt fabric made from a cotton blend. This is a simple product.</p>\n',
        sku: '',
        price: '350',
        regular_price: '400',
        sale_price: '350',
        date_on_sale_from: null,
        date_on_sale_from_gmt: null,
        date_on_sale_to: null,
        date_on_sale_to_gmt: null,
        on_sale: true,
        purchasable: true,
        total_sales: 0,
        virtual: false,
        downloadable: false,
        downloads: [],
        download_limit: 0,
        download_expiry: 0,
        external_url: '',
        button_text: '',
        tax_status: 'taxable',
        tax_class: '',
        manage_stock: false,
        stock_quantity: null,
        backorders: 'no',
        backorders_allowed: false,
        backordered: false,
        low_stock_amount: null,
        sold_individually: false,
        weight: '',
        dimensions: {
          length: '',
          width: '',
          height: '',
        },
        shipping_required: true,
        shipping_taxable: true,
        shipping_class: '',
        shipping_class_id: 0,
        reviews_allowed: true,
        average_rating: '0.00',
        rating_count: 0,
        upsell_ids: [],
        cross_sell_ids: [],
        parent_id: 0,
        purchase_note: '',
        categories: [
          {
            id: 1379,
            name: 'Hoodies',
            slug: 'hoodies',
          },
        ],
        tags: [],
        images: [
          {
            id: 50,
            date_created: '2023-03-09T18:18:05',
            date_created_gmt: '2023-03-09T07:18:05',
            date_modified: '2023-03-09T18:18:05',
            date_modified_gmt: '2023-03-09T07:18:05',
            src: 'https://woo-freely-maximum-nacho.wpcomstaging.com/wp-content/uploads/2023/03/hoodie-with-logo-2.jpg',
            name: 'hoodie-with-logo-2.jpg',
            alt: '',
          },
        ],
        attributes: [
          {
            id: 1,
            name: 'Color',
            position: 0,
            visible: true,
            variation: false,
            options: [
              'Blue',
            ],
          },
        ],
        default_attributes: [],
        variations: [],
        grouped_products: [],
        menu_order: 0,
        price_html: '<del aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&#36;</span>400.00</bdi></span></del> <ins><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&#36;</span>350.00</bdi></span></ins>',
        related_ids: [],
        meta_data: [
          {
            id: 338,
            key: '_wpcom_is_markdown',
            value: '1',
          },
          {
            id: 342,
            key: '_last_editor_used_jetpack',
            value: 'classic-editor',
          },
          {
            id: 347,
            key: '_product_addons',
            value: [],
          },
          {
            id: 348,
            key: '_product_addons_exclude_global',
            value: '0',
          },
          {
            id: 349,
            key: 'group_of_quantity',
            value: '5',
          },
          {
            id: 350,
            key: 'minimum_allowed_quantity',
            value: '5',
          },
          {
            id: 351,
            key: 'maximum_allowed_quantity',
            value: '10',
          },
          {
            id: 352,
            key: 'minmax_do_not_count',
            value: 'no',
          },
          {
            id: 353,
            key: 'minmax_cart_exclude',
            value: 'yes',
          },
          {
            id: 354,
            key: 'minmax_category_group_of_exclude',
            value: 'no',
          },
          {
            id: 356,
            key: '_wpas_done_all',
            value: '1',
          },
        ],
        stock_status: 'instock',
        has_options: false,
        bundled_by: [],
        bundle_stock_status: 'instock',
        bundle_stock_quantity: null,
        bundle_virtual: false,
        bundle_layout: '',
        bundle_add_to_cart_form_location: '',
        bundle_editable_in_cart: false,
        bundle_sold_individually_context: '',
        bundle_item_grouping: '',
        bundle_min_size: '',
        bundle_max_size: '',
        bundled_items: [],
        bundle_sell_ids: [],
        jetpack_publicize_connections: [],
        jetpack_sharing_enabled: true,
        jetpack_likes_enabled: true,
        brands: [],
        _links: {
          self: [
            {
              href: 'https://woo-freely-maximum-nacho.wpcomstaging.com/wp-json/wc/v3/products/52',
            },
          ],
          collection: [
            {
              href: 'https://woo-freely-maximum-nacho.wpcomstaging.com/wp-json/wc/v3/products',
            },
          ],
        },
      },
    ];
    const ondcResponseItem = [{
      id: '52',
      descriptor: {
        name: 'T-shirt',
        images: 'https://woo-freely-maximum-nacho.wpcomstaging.com/wp-content/uploads/2023/03/hoodie-with-logo-2.jpg',
        long_desc: '<p><img class="alignnone size-medium wp-image-53" src="https://woo-freely-maximum-nacho.wpcomstaging.com/wp-content/uploads/2023/03/tshit-240x300.webp" alt="" width="240" height="300" /></p>\n',
        short_desc: '<p>Hoodie in sweatshirt fabric made from a cotton blend. This is a simple product.</p>\n',
      },
      price: {
        value: '350',
        maximum_value: '400',
      },
      recommended: true,
      rating: 0,
      parent_item_id: '0',
      category_id: '1379',
      location_id: '',
    }];
    const platformConvertor = new PlatformConvertor(platformResponseItem);
    const actualOndcResponseJson = await platformConvertor.convert();
    expect(actualOndcResponseJson).toStrictEqual(ondcResponseItem);
  });
});
