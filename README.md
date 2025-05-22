# **Inventory System**  
A guide to start the application

---

## **Backend**

1. Clone the repository
2. Execute the following command:  
   ```bash
   cd InventoryApi
   ```
3. Then execute the following command:  
   ```bash
   dotnet restore
   ```
4. Update the database by running:  
   ```bash
   dotnet ef database update
   ```
   > ⚠️ If you haven't already, install `dotnet-ef` using:  
   ```bash
   dotnet tool install --global dotnet-ef
   ```
5. If using SQL Express, update the connection string to:  
   ```
   localhost\SQLEXPRESS
   ```
6. Finally, run the API:  
   ```bash
   dotnet watch run
   ```
   ✅ _API should be running and connected to the database._

> ℹ️ Execute the attached script to populate the database with sample products.

---

## **Frontend**

1. From the root folder (`Inventory-System`), run:  
   ```bash
   cd InventoryFrontend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Install Angular CLI globally (if not installed):  
   ```bash
   npm install -g @angular/cli
   ```
4. Update the CORS policy in `Program.cs` (line 16):  
   Change the port in `.WithOrigins()` from `4200` to `4201`

5. Then run the frontend app:  
   ```bash
   ng serve --port 4201
   ```

> ✅ Make sure the API is running before launching the frontend.
