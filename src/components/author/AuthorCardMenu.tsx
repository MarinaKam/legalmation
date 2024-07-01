import { FC } from 'react';
import { List, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

type AuthorCardMenuProps = {
  onOpenPreview: () => void;
  onUpdate: () => void;
  onDelete: () => void;
};

export const AuthorCardMenu: FC<AuthorCardMenuProps> = ({
  onOpenPreview,
  onDelete,
  onUpdate,
}) => {
  return (
    <List data-testid="author-menu-list">
      <MenuItem
        data-testid="author-preview-btn"
        title="Preview"
        onClick={onOpenPreview}
      >
        <ListItemIcon>
          <VisibilityOutlinedIcon color="info" fontSize="inherit" />
        </ListItemIcon>

        <ListItemText primary="Preview" />
      </MenuItem>

      <MenuItem title="Update Author" onClick={onUpdate}>
        <ListItemIcon>
          <EditIcon color="primary" fontSize="inherit" />
        </ListItemIcon>

        <ListItemText primary="Edit" />
      </MenuItem>

      <MenuItem title="Delete Author" onClick={onDelete}>
        <ListItemIcon>
          <DeleteIcon color="error" fontSize="inherit" />
        </ListItemIcon>

        <ListItemText primary="Delete" />
      </MenuItem>
    </List>
  );
};
