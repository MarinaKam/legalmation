import { FC, MouseEvent, useState } from 'react';
import {
  Card,
  Popover,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { deleteAuthor } from '../../store/actions';
import { dialogSlice } from '../../store/slices/dialogSlice';
import { useAppDispatch } from '../../store/utils';
import type { Author } from '../../types';
import { AuthorCardMenu } from './AuthorCardMenu';

export const AuthorCard: FC<{ author: Author }> = ({ author }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenPreviewAuthor = () => {
    dispatch(dialogSlice.actions.update({ isOpenPreview: true, author }));
    handleClose();
  };

  const handleUpdateAuthor = () => {
    dispatch(dialogSlice.actions.update({ isOpen: true, author }));
    handleClose();
  };

  const handleDeleteAuthor = () => {
    dispatch(deleteAuthor(author.id));
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Card sx={{ width: ['100%', 330, 298] }}>
      <CardHeader
        data-testid="author-item"
        avatar={<Avatar alt={author.name} src={author.image} />}
        action={
          <>
            <IconButton aria-label="actions" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <AuthorCardMenu
                onOpenPreview={handleOpenPreviewAuthor}
                onUpdate={handleUpdateAuthor}
                onDelete={handleDeleteAuthor}
              />
            </Popover>
          </>
        }
        title={author.name}
      />

      <CardContent>
        <Typography noWrap variant="body2" color="text.secondary">
          {author.description} <br />
          Books: {author?.books?.length || 0}
        </Typography>
      </CardContent>
    </Card>
  );
};
