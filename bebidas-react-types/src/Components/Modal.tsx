import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';


export default function Modal() {
  const modal = useAppStore((state)=> state.modal)
  const closeModal = useAppStore((state)=> state.closeModal)
  const detailDrink = useAppStore((state)=> state.detailDrink)

  const renderIngredients = () => {
   const ingredients = [];

    // Iteramos del 1 al 6 (o hasta 15 según tu esquema)
    for (let i = 1; i <= 6; i++) {
      // Extraemos dinámicamente el ingrediente y la medida usando template literals
      const ingredient = detailDrink[`strIngredient${i}` as keyof typeof detailDrink];
      const measure = detailDrink[`strMeasure${i}` as keyof typeof detailDrink];

      // Si existe un ingrediente, lo agregamos a nuestra lista
      if (ingredient) {
        ingredients.push(
          <li key={i} className="text-lg font-normal text-gray-700">
            {/* Mostramos el ingrediente y su medida correspondiente (si la tiene) */}
            <span className="font-bold">{ingredient}</span> {measure ? `- ${measure}` : ''}
          </li>
        );
      }
    }

    return (
      <ul className="my-2 space-y-2">
        {ingredients.length > 0 ? ingredients : <p>No hay ingredientes registrados.</p>}
      </ul>
    );
  }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                      {detailDrink.strDrink}
                  </Dialog.Title>
                  <img src={detailDrink.strDrinkThumb} alt={detailDrink.strDrink} />
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Ingredientes
                  </Dialog.Title>
                    {renderIngredients()}
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Instrucciones
                  </Dialog.Title>
                    <p>{detailDrink.strInstructions}</p>
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                  </Dialog.Title>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}