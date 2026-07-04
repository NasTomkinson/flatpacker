type ProductCardProps = {
  imageLabel?: string;
  author?: string;
  price?: string;
  name?: string;
  description?: string;
};

export const ProductCard = ({
  imageLabel = "Image",
  author = "Author",
  price = "price",
  name = "name",
  description = "short description",
}: ProductCardProps) => {
  return (
    <article className="overflow-hidden rounded-md bg-white shadow">
        <div className="flex aspect-[4/3] items-center justify-center bg-neutral-light text-sm font-semibold text-neutral-dark">
            {imageLabel}
        </div>

        <div className="flex flex-col gap-2 p-4 ">
            <div className="flex items-center justify-between gap-3 text-sm text-neutral-dark">
            <span>{author}</span>
            <span className="font-bold text-foreground">{price}</span>
            </div>

            <h3 className="text-lg leading-tight">{name}</h3>
            <p className="text-sm leading-6 text-neutral-dark">{description}</p>
        </div>
        <div className="bg-neutral-light px-4 py-2">
            <ul className="flex  items-center justify-between m-0! p-0! list-none *:p-0! *:m-0! text-sm" >
                <li> 2 Sheets </li>
                <li> 18mm MDF </li>
                <li> 24 cuts </li>
            </ul>
        </div>
    </article>
);
};
