import { Icon, ProductCard } from "@flatpacker/ui/components";

export default function Home() {
  return ( 
    <main> 
      <section className="py-12">
        <div className="container grid grid-cols-4 grid-rows-3 gap-4 *:rounded-lg *:bg-neutral-light *:shadow"> 
          <div className="col-span-3 row-span-3 aspect-[2/1] flex flex-col justify-center items-start p-6 gap-4">
            <div className="flex flex-col gap-1">
              <h1> Flatpacker </h1>
              <p> Plan, optimise and export sheet cutting layouts for plywood, MDF and sheet goods. </p>            
            </div>

            <div className="flex gap-4">              
              <button className="button primary"> Create cutlist </button>      
              <button className="button ghost"> Browse catalogue </button>  
        
            </div>

          </div>
          <div className="flex flex-col justify-end items-start p-4">
            <Icon name="mdi:view-grid-outline" size={7} className="text-brand" />
            <h2 className="text-lg"> Catalogue </h2>
            <p className="text-sm"> Browse our huge collection of designs. </p>
          </div>
          <div className="flex flex-col justify-end items-start p-4">
            <Icon name="mdi:ruler-square" size={7} className="text-brand" />
            <h2 className="text-lg"> Cut planner </h2>
            <p className="text-sm"> Create cutlists for your projects. </p>
          </div>
          <div className="flex flex-col justify-end items-start p-4">
            <Icon name="mdi:account-badge-outline" size={7} className="text-brand" />
            <h2 className="text-lg"> Community </h2>
            <p className="text-sm"> Join our community and get started. </p>
          </div>
        </div>
      </section> 

      <section className="py-12">
        <div className="container flex flex-col gap-1"> 
          <div className="flex justify-between items-center">
            <div>
                <h2 > Recent projects </h2>
                <p className="text-lg"> Browse the latest from our community </p>
            </div>
            <button className="button primary"> Browse </button>
          </div> 

          <div className="grid grid-cols-4 gap-4 mt-4"> 
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>
    </main>
  );
}
