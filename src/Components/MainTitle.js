import React from 'react';

class MainTitle extends React.Component {
  render() {
    return (
      <div className="p-10">
        <h1 className="text-8xl font-bold uppercase">
          <span
            className="bg-clip-text text-[transparent]
          bg-gradient-to-r from-[#1dffec] via-[#a5fc19] to-[#13f78c]"
          >
            Search
            <br />
            For
            <br />
            Artists
          </span>
        </h1>
      </div>
    );
  }
}

export default MainTitle;
