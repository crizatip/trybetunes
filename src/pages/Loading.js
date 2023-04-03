import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div className="flex flex-col items-center justify-center text-white">
        <div
          className=" m-5 inline-block h-20 w-20 animate-spin rounded-full border-8
          border-solid border-current border-r-[transparent] align-[-0,125em]
          motion-reduce:animate-[spin_100s_linear_infinite]"
          role="status"
        >
          <span
            className="!absolute
            !-m-2 !h-px !w-px !overflow-hidden
            !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Loading...

          </span
          >
        </div>
        <span
          className="font-bold text-xl"
        >
          Carregando

        </span>
      </div>
    );
  }
}

export default Loading;
