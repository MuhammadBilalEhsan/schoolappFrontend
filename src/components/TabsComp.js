import React, { useState } from 'react'
import { Tabs, Tab, Box } from "@mui/material"

const TabsComp = ({ tab1Label, tab2Label, tab3Label, tab4Label, panel1, panel2, panel3, panel4 }) => {

    const [value, setValue] = useState(0);


    const handleTabs = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleTabs}
                    textColor="inherit"
                    scrollButtons='auto'
                    variant="scrollable"
                    TabIndicatorProps={{
                        sx: {
                            backgroundColor: "green",
                            height: "5px",
                        },
                    }}
                >
                    <Tab label={tab1Label} />
                    <Tab label={tab2Label} />
                    {tab3Label ? (
                        <Tab label={tab3Label} />
                    ) : (
                        ""
                    )}
                    {tab4Label ? (
                        <Tab label={tab4Label} />
                    ) : (
                        ""
                    )}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>{panel1}</TabPanel>
            <TabPanel value={value} index={1}>{panel2}</TabPanel>
            {panel3 ? (
                <TabPanel value={value} index={2}>{panel3}</TabPanel>
            ) : (
                ""
            )}
            {panel4 ? (
                <TabPanel value={value} index={3}>{panel4}</TabPanel>
            ) : (
                ""
            )}
        </Box>
    )
}

function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <Box width="100%" sx={{ marginX: "auto", padding: "5px" }}>
            {value === index && <Box> {children} </Box>}
        </Box>
    );
}

export default TabsComp
