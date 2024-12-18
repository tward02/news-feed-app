import React, {useEffect, useState} from "react";
import {Checkbox, List, ListItem, Paper, Typography} from "@mui/material";
import classes from './FilterList.module.css';

const FilterList = ({items, onChange, title, selectedItems}) => {

    const [selectedKeys, setSelectedKeys] = useState([]);

    useEffect(() => {
        if (selectedItems) {
            setSelectedKeys(selectedItems?.map((item) => item.key));
        }
    }, [selectedItems]);

    const handleToggle = (itemKey) => {
        const currentIndex = selectedKeys.indexOf(itemKey);
        const newSelectedKeys = [...selectedKeys];

        if (currentIndex === -1) {
            newSelectedKeys.push(itemKey);
        } else {
            newSelectedKeys.splice(currentIndex, 1);
        }

        setSelectedKeys(newSelectedKeys);

        const selectedItems = items.filter((item) => newSelectedKeys.includes(item.key));
        onChange(selectedItems);
    };

    return (
        <div className={classes.list}>
            <Typography variant="h6">{title}</Typography>
            <List aria-label={title} className={classes.listBody}>
                {items.map((item) => (
                    <ListItem key={item.key} disablePadding>
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
                                    inputProps={{
                                        'aria-label': title + ' ' + item.value,
                                    }}
                                />
                                <Typography style={{marginLeft: "8px"}}>{item.value}</Typography>
                            </Paper>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default FilterList;
