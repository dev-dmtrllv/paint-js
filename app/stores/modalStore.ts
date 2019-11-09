import React from "react";
import { observable, action } from "mobx";

class ModalStore
{
	@observable isOpen = false;
	@observable title: string = "";
	@observable body: JSX.Element | null = null;

	
	@action open = (props?: IModalStoreProps) => 
	{
		this.isOpen = true;
		if (props)
		{
			if (props.title)
				this.title = props.title;
			if(props.body)
				this.body = props.body;
		}
	};

	@action close = () => this.isOpen = false;

	@action toggle = () => this.isOpen = !this.isOpen;
}

interface IModalStoreProps
{
	title?: string;
	body?: JSX.Element | null;
}

export const modalStore = new ModalStore();