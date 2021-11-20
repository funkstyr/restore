> Course: https://www.udemy.com/course/learn-to-build-an-e-commerce-store-with-dotnet-react-redux

## .Net Core

### create project

`dotnet new sln`

`dotnet new webapi -o API`

`dotnet sln add API`

### run project

`dotnet watch run`


### database


#### Initial Migrations

 Install/Update dotnet-ef

 > dotnet tool install --global dotnet-ef

 > dotnet tool update --global dotnet-ef

 `dotnet ef migrations add InitialCreate -o Data/Migrations`

 `dotnet ef database update`