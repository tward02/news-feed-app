import React, {useState} from "react";
import {ButtonBase, Checkbox, List, ListItem, Paper, Typography} from "@mui/material";
import classes from './FilterList.module.css';

const FilterList = ({items, onChange, title}) => {

    const [selectedKeys, setSelectedKeys] = useState([]);

    const handleToggle = (itemKey) => {
        const currentIndex = selectedKeys.indexOf(itemKey);
        const newSelectedKeys = [...selectedKeys];

        if (currentIndex === -1) {
            // Add itemKey to selectedKeys
            newSelectedKeys.push(itemKey);
        } else {
            // Remove itemKey from selectedKeys
            newSelectedKeys.splice(currentIndex, 1);
        }

        setSelectedKeys(newSelectedKeys);

        // Pass back the selected items (full objects) to the parent
        const selectedItems = items.filter((item) => newSelectedKeys.includes(item.key));
        onChange(selectedItems);
    };

    return (
        <div className={classes.list}>
            <Typography variant="h6">{title}</Typography>
            <List className={classes.listBody}>
                {items.map((item) => (
                    <ListItem key={item.key} disablePadding>
                        <ButtonBase style={{width: "100%"}}
                                    onClick={() => handleToggle(item.key)}>
                            <Paper elevation={1}
                                   style={{
                                       width: "100%",
                                       display: "flex",
                                       alignItems: "center",
                                   }}
                            >
                                <Checkbox
                                    checked={selectedKeys.includes(item.key)}
                                    onChange={(e) => e.stopPropagation()}
                                />
                                <Typography style={{marginLeft: "8px"}}>{item.value}</Typography>
                            </Paper>
                        </ButtonBase>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default FilterList;
