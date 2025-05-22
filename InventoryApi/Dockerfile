FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["InventoryApi/InventoryApi.csproj", "InventoryApi/"]
RUN dotnet restore "InventoryApi/InventoryApi.csproj"
COPY . .
WORKDIR "/src/InventoryApi"
RUN dotnet publish "InventoryApi.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "InventoryApi.dll"]