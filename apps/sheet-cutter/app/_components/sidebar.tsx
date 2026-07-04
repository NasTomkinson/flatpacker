"use client";

import { useFieldArray, FormProvider, useForm } from "react-hook-form";
import { FormInput } from "@flatpacker/ui/components";

type CutlistItem = {
    quantity: number;
    cutWidth: number;
    cutHeight: number;
};

type CutlistSearchFormValues = {
    sheetWidth: number;
    sheetHeight: number;
    sheetDepth: number;
    cutlist: CutlistItem[];
};

export const Sidebar = () => {

    const form = useForm<CutlistSearchFormValues>({
        defaultValues: {
            sheetWidth: 2440,
            sheetHeight: 1220,
            sheetDepth: 18,
            cutlist: []
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "cutlist",
    });

    const addCut = () => {
        append({
            quantity: 1,
            cutWidth: 0,
            cutHeight: 0,
        });
    };
  
    return (
        <aside className="relative bg-neutral-light p-6 border border-neutral max-h-screen h-screen max-w-[400px]">
            <div className="border-b border-neutral pb-6">
                <h2>Your project </h2> 
                <span> By NasTomkinson </span>
            </div>

            <div>
                <FormProvider {...form}>
                    <form className="flex flex-col gap-4">

                        {/* Sheet specifications */}
                        <details className="flex flex-col gap-4 border-b py-6 border-neutral"> 
                            <summary className="flex flex-col gap-1">
                                <h3 className="text-lg"> Sheet configuration </h3>
                                <span> Configure the sheet you want to cut. </span>                                
                            </summary>

                            <div className="flex flex-row gap-2">
                                <FormInput
                                    label="width"
                                    name="sheetWidth"
                                    type="number"
                                />
                                <FormInput
                                    label="height"
                                    name="sheetHeight"
                                    type="number"
                                />
                                <FormInput
                                    label="depth"
                                    name="sheetDepth"
                                    type="number"
                                />                                
                            </div>
                        </details>

                        {/* Cutlist */}
                        <div className="relative grid grid-cols-[1fr_2fr_2fr_1fr] gap-3 items-center border-b h-[600px] border-neutral overflow-y-scroll">
                            <div className="grid grid-cols-subgrid col-span-4 sticky top-0 left-0 w-full bg-neutral-light">
                                <div className="col-span-4 flex flex-row justify-between items-center border-b border-neutral ">
                                    <h3 className="text-lg"> My cutlist </h3>
                                    <button className="button secondary" type="button" onClick={addCut}>
                                        Add cut
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-subgrid col-span-4 py-4 uppercase font-medium text-sm">
                                    <span> Quantity </span>
                                    <span> Width </span>
                                    <span> Height </span> 
                                    <span> Actions </span> 
                                </div>
                            </div> 

                            { fields.map((cutlistItem, index) => (
                                <div className="grid grid-cols-subgrid col-span-4" key={cutlistItem.id}>
                                    <FormInput
                                        label="Quantity"
                                        name={`cutlist.${index}.quantity`}
                                        type="number"
                                        hideLabel
                                    />
                                    <FormInput
                                        label="Cut width"
                                        name={`cutlist.${index}.cutWidth`}
                                        type="number"
                                        hideLabel
                                    />
                                    <FormInput
                                        label="Cut height"
                                        name={`cutlist.${index}.cutHeight`}
                                        type="number"
                                        hideLabel
                                    /> 
                                    <div> 
                                        <button className=" " type="button" onClick={() => remove(index)}>
                                            X
                                        </button>
                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* Save functionality */}
                        <div className="sticky bottom-0 left-0 w-full flex flex-row justify-end"> 
                            <button className="button primary w-full mt-6">
                                Save cutlist
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </aside>
    );
};
