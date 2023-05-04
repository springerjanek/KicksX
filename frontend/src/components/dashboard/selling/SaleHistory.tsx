import React from "react";

export const SaleHistory = ({ userData }: { userData: UserData }) => {
  return (
    <>
      {userData.sales.length > 1 ? (
        userData.sales.map((sale) => {
          const { id, name, price, size, thumbnail } = sale;
          return (
            <div key={id} className="flex gap-4">
              {id.length > 0 && (
                <>
                  <img src={thumbnail} className="w-24 h-20" />
                  <div className="flex flex-col">
                    <p> {name}</p>

                    <p> Size: {size}</p>
                  </div>
                  <p className="sm:mr-14">${price}</p>
                </>
              )}
            </div>
          );
        })
      ) : (
        <p>--</p>
      )}
    </>
  );
};
