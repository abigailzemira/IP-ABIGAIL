import { useEffect } from "react"
import "../App.css"
// import { Carousel } from 'flowbite';


export default function Carousel() {
  // const carousel = new Carousel(carouselElement, items, options, instanceOptions);
  useEffect(() => {
    const items = [
      {
          position: 0,
          el: document.getElementById('carousel-item-1'),
      },
      {
          position: 1,
          el: document.getElementById('carousel-item-2'),
      },
      {
          position: 2,
          el: document.getElementById('carousel-item-3'),
      },
      {
          position: 3,
          el: document.getElementById('carousel-item-4'),
      },
  ];
  
  // options with default values
  const options = {
      defaultPosition: 1,
      interval: 3000,
  
      indicators: {
          activeClasses: 'bg-white dark:bg-gray-800',
          inactiveClasses:
              'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
          items: [
              {
                  position: 0,
                  el: document.getElementById('carousel-indicator-1'),
              },
              {
                  position: 1,
                  el: document.getElementById('carousel-indicator-2'),
              },
              {
                  position: 2,
                  el: document.getElementById('carousel-indicator-3'),
              },
              {
                  position: 3,
                  el: document.getElementById('carousel-indicator-4'),
              },
          ],
      },
  
      // callback functions
      onNext: () => {
          console.log('next slider item is shown');
      },
      onPrev: () => {
          console.log('previous slider item is shown');
      },
      onChange: () => {
          console.log('new slider item has been shown');
      },
  };
  
  // instance options object
  const instanceOptions = {
    id: 'carousel-example',
    override: true
  };
  }, [])
    return (
        <div
          id="default-carousel"
          className="relative w-full"
          data-carousel="slide"
        >
          {/* Carousel wrapper */}
          <div className="relative h-1/4 overflow-hidden rounded-lg md:h-96">
            {/* Item 1 */}
            <div
              className="hidden duration-2000 ease-in-out"
              key={1}
              data-carousel-item=""
            >
              <img
                src="https://i.pinimg.com/736x/c4/fd/ae/c4fdaed6b6c0436e7f28d847d3e0b881.jpg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
             <div className="flex justify-end">
             <p className="rounded-box p-4 bg-amber-50" style={{fontFamily: "SourceCodePro"}}>Arts</p>
             </div>
            </div>
            {/* Item 2 */}
            <div
              className="hidden duration-2000 ease-in-out"
              key={2}
              data-carousel-item=""
            >
              <img
                src="https://www.franklinartstudio.com.au/cdn/shop/files/P1300841.jpg?v=1693022016&width=3000"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* Item 3 */}
            <div
              className="hidden duration-2000 ease-in-out"
              key={3}
              data-carousel-item=""
            >
              <img
                src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* Item 4 */}
            <div
              className="hidden duration-2000 ease-in-out"
              key={4}
              data-carousel-item=""
            >
              <img
                src="https://images.unsplash.com/photo-1453733190371-0a9bedd82893?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* Item 5 */}
            <div
              className="hidden duration-2000 ease-in-out"
              key={5}
              data-carousel-item=""
            >
              <img
                src="https://images.unsplash.com/photo-1578321270951-88bd84d09a64?q=80&w=2007&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          </div>
          
          {/* Slider controls */}
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev=""
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next=""
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
    )
}