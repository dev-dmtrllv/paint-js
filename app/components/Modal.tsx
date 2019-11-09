import React from "react";
import { observer } from "mobx-react";
import { View, FlexBox, FlexItem } from "views";
import { getClassFromProps } from "utils/react";
import { modalStore } from "stores";

import "./styles/modal.scss";

@observer
export class Modal extends React.Component
{
	render()
	{
		const cn = getClassFromProps("modal-wrapper", { open: modalStore.isOpen });
		return (
			<View absolute fill className={cn} onClick={modalStore.close}>
				<View absolute centered className={`modal`} onClick={e => e.stopPropagation()}>
					<FlexBox fill vertical>
						<FlexItem base={24} className="titlebar">
							<View absolute centered="vertical" className="title">{modalStore.title}</View>
							<View absolute centered="vertical" className="btn-close" onClick={modalStore.close} />
						</FlexItem>
						<FlexItem className="body">
							{modalStore.body}
						</FlexItem>
					</FlexBox>
				</View>
			</View>
		);
	}
}