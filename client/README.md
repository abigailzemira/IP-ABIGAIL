# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




Backup:
<div className="h-11/12">
        <div className="carousel w-full h-2/5" data-carousel="slide">
          {categoryHeader.map((header) => {
            return (
              <div
                id={`#slide${header.id}`}
                className="carousel-item relative w-full duration-700 ease-in-out"
                key={header.id}
                data-carousel-item="true"
              >
                <img
                  src={header.imageUrl}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
