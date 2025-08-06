export const exampleJson = `{
  "$schema": "https://example.com/schemas/order-2.0.json",
  "$id": "urn:order:2025-08-06:PL-12345",
  "meta": {
    "version": 2,
    "traceId": "0f3b9b6b-4e1a-4ef8-9c9e-34b5f7c9a1de",
    "generatedAt": "2025-08-06T10:15:30.123456+02:00",
    "flags": ["beta", "edge-case", "🚧"]
  },
  "customer": {
    "id": "cust_0001",
    "display name": "Żaneta Kowalska",
    "contact": {
      "email": "zaneta.k@example.pl",
      "phone": "+48 600 100 200",
      "preferred": "email"
    },
    "addresses": [
      {
        "type": "billing",
        "line1": "Ul. Przykładowa 12/5",
        "city": "Warszawa",
        "postalCode": "00-001",
        "country": "PL",
        "geo": { "lat": 52.2297, "lon": 21.0122 }
      },
      {
        "type": "shipping",
        "line1": "Aleje Jerozolimskie 1",
        "city": "Warszawa",
        "postalCode": "00-508",
        "country": "PL",
        "geo": null
      }
    ]
  },
  "items": [
    {
      "sku": "SKU-0001",
      "name": "Ultra Widget \"Pro\"",
      "quantity": 2,
      "price": 199.99,
      "currency": "PLN",
      "attributes": {
        "color": "black",
        "dimensions": { "w": 10.5, "h": 3.2, "d": 1.1, "unit": "cm" },
        "tags": [],
        "extra": {}
      }
    },
    {
      "sku": "SKU-0002",
      "name": "Subscription Add-on",
      "quantity": 1,
      "price": 0,
      "currency": "PLN",
      "recurring": {
        "interval": "P1M",
        "nextChargeAt": "2025-09-06T09:00:00Z"
      },
      "$ref": "#/customer/addresses/1"
    }
  ],
  "payments": [
    {
      "type": "card",
      "status": "authorized",
      "amount": 399.98,
      "currency": "PLN",
      "card": {
        "brand": "Visa",
        "last4": "4242",
        "exp": "2030-12",
        "holder": "ZANETA KOWALSKA"
      },
      "capturedAt": null
    },
    {
      "type": "wire",
      "status": "pending",
      "amount": 50.00,
      "currency": "PLN",
      "wire": {
        "iban": "PL61109010140000071219812874",
        "bic": "WBKPPLPP"
      }
    }
  ],
  "shipments": [
    {
      "carrier": "InPost",
      "tracking": "PL-123-456-789",
      "eta": "2025-08-09",
      "addressRef": { "$ref": "#/customer/addresses/1" },
      "contents": [
        { "sku": "SKU-0001", "qty": 1 },
        { "sku": "SKU-0002", "qty": 1 }
      ]
    }
  ],
  "auditTrail": [
    {
      "at": "2025-08-06T08:00:00Z",
      "actor": "system",
      "action": "created",
      "ip": "203.0.113.10"
    },
    {
      "at": "2025-08-06T09:30:12Z",
      "actor": "user:cust_0001",
      "action": "updated",
      "diff": [{ "op": "replace", "path": "/items/0/quantity", "value": 2 }]
    }
  ],
  "featureFlags": {
    "exp.rollout-1": true,
    "β-feature": false,
    "_hidden": { "note": "toggle within nested object" }
  },
  "attachments": null,
  "notes": "",
  "tags": ["vip", "β-test", "促销"],
  "calculations": {
    "subtotal": 449.98,
    "tax": 0,
    "discounts": [
      { "code": "WELCOME10", "amount": 50.00, "stackable": false }
    ],
    "exchangeRate": 4.1234,
    "total": 399.98,
    "currency": "PLN",
    "preciseTotal": "399.9800000000000001"
  },
  "scheduling": {
    "createdAt": "2025-08-06T10:15:30+02:00",
    "paidAt": null,
    "deliverBy": "2025-08-09",
    "reminders": ["P3D", "PT2H"]
  },
  "relationships": {
    "parentOrderId": null,
    "relatedOrderIds": ["urn:order:2025-08-01:PL-00077"]
  },
  "dataBlobs": {
    "invoicePdfBase64": "JVBERi0xLjQKJcTl8uXrp/Og0MTGCi4uLg==",
    "smallImageBase64": "iVBORw0KGgoAAAANSUhEUgAAAAUA"
  },
  "warehouseMap": {
    "A1": { "bin": "A1-01", "qty": 10 },
    "B-β": { "bin": "B-02", "qty": 0 },
    "2025": { "bin": "Y-25", "qty": 3 }
  },
  "matrix": [[1, 2, 3], [4, 5], [], [6]],
  "regexTest": "^[A-Z]{2}-\\d{5}$",
  "unicode": "Zażółć gęślą jaźń 🚀",
  "content": [
    { "type": "text", "text": "Hello, \"world\"!\nLine 2\tTabbed." },
    {
      "type": "image",
      "url": "https://cdn.example.com/img/abc123.png",
      "size": { "width": 800, "height": 600 }
    },
    {
      "type": "chart",
      "data": [[1, 2], [3, 4], [5, 6]],
      "options": { "xAxis": "time", "yAxis": "value" }
    }
    ],
  "polymorphicList": [
    { "kind": "cat", "name": "Luna", "lives": 9 },
    { "kind": "dog", "name": "Pixel", "good": true },
    { "kind": "fish", "name": "Bąbelek", "water": "fresh" }
  ],
  "deep": {
    "level1": {
      "level2": {
        "level3": {
          "arr": [{ "k": "v" }, []],
          "emptyObj": {}
        }
      }
    }
  },
  "hugeNumbers": {
    "bigIntAsString": "123456789012345678901234567890",
    "scientific": 6.022e23,
    "negative": -42,
    "zero": 0
  },
  "customProperties": {
    "x-internal": true,
    "$transient": 1,
    "_private": { "reason": "testing mapping of special keys" }
  }
}
`;
