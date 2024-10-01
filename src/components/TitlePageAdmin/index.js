import { useState, createContext } from 'react';

import DefaultLayoutAdmin from '~/layout/Admin/DefaultLayout';
import Sidebar from '~/layout/Admin/components/Sidebar';
import Header from '~/layout/components/Header';

export const HeaderContext = createContext({
    dynamicHeaderText: 'default',
    handleSetDynamicHeaderText: () => {},
});

function TitlePageAdmin() {
    const [dynamicHeaderText, setDynamicHeaderText] = useState('default');

    const handleSetDynamicHeaderText = (newHeader) => {
        setDynamicHeaderText(newHeader);
    };
    return (
        <HeaderContext.Provider value={{ dynamicHeaderText, handleSetDynamicHeaderText }}>
            <Header />
            <DefaultLayoutAdmin />
            <Sidebar handleSetDynamicHeaderText={handleSetDynamicHeaderText} />
        </HeaderContext.Provider>
    );
}

export default TitlePageAdmin;
