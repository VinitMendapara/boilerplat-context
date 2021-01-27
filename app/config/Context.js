import React, { Component, createContext } from "react";
export const Context = createContext();

export class Provider extends Component {

    state = {
        name:"Vinit"
    }

    render() {
        console.log(this.state.name);
		return (
			<Context.Provider value={{name:this.state.name}}>
                {this.props.children}
            </Context.Provider>
        )
    }
}