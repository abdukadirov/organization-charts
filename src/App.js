import React from 'react';
import {DecompositionTreeGraph} from '@ant-design/graphs';
import './App.css'
import OrgStructure from "./OrgStructure.json"

const App = () => {

    const recursiveFunc = (list) => {
        const data = []
        for (let i = 0; i < list.length; i++) {
            const item = {
                id:list[i].Id.toString(),
                value:{
                    title:list[i].Value.Name,
                    items: [
                        {text: list[i].Value.Name}
                    ]
                }
            }
            if (list[i].SubNodes && list[i].SubNodes.length > 0) {
                item.children = recursiveFunc(list[i].SubNodes)
            }
            data.push(item)
        }
        return data
    }

    const data = {
        id:OrgStructure.Id.toString(),
        value:{
            title:OrgStructure.Value.Name,
            items: [
                {text: OrgStructure.Value.Name}
            ]
        }
    }

    data.children = recursiveFunc(OrgStructure.SubNodes);
    console.log(data, "data")

    const config = {
        data,
        markerCfg: (cfg) => {
            const {children} = cfg;
            return {
                show: children?.length,
            };
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        autoFit: true,
        layout: {
            dropCap: false,
            indent: 250,
            getHeight: () => {
                return 60;
            },
            getWidth: () => {
                return 100;
            },
        },
        nodeCfg: {
            autoWidth: true,
            items: {
                layout: 'follow',
            },
        },
    };

    return (
        <div className="App">
            <DecompositionTreeGraph {...config} />
        </div>
    )
};

export default App