"""empty message

Revision ID: ff9b37c46abb
Revises: 
Create Date: 2024-02-26 15:27:10.231481

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ff9b37c46abb'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('genre', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(length=40), nullable=False),
    sa.Column('lastName', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('gender', sa.String(length=10), nullable=True),
    sa.Column('phone', sa.String(length=20), nullable=True),
    sa.Column('address1', sa.String(length=255), nullable=True),
    sa.Column('address2', sa.String(length=255), nullable=True),
    sa.Column('city', sa.String(length=255), nullable=True),
    sa.Column('country', sa.String(length=255), nullable=True),
    sa.Column('subregion', sa.String(length=255), nullable=True),
    sa.Column('postal_code', sa.String(length=255), nullable=True),
    sa.Column('profileImage', sa.String(), nullable=True),
    sa.Column('premiumPepps', sa.Integer(), nullable=False),
    sa.Column('isRepp', sa.Boolean(), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('genreId', sa.Integer(), nullable=False),
    sa.Column('displayName', sa.String(length=40), nullable=False),
    sa.Column('linkName', sa.String(length=40), nullable=False),
    sa.Column('personalLogo', sa.String(), nullable=True),
    sa.Column('statusText', sa.String(), nullable=True),
    sa.Column('tiktok', sa.String(), nullable=True),
    sa.Column('youtube', sa.String(), nullable=True),
    sa.Column('instagram', sa.String(), nullable=True),
    sa.Column('applemusic', sa.String(), nullable=True),
    sa.Column('spotify', sa.String(), nullable=True),
    sa.Column('facebook', sa.String(), nullable=True),
    sa.Column('discord', sa.String(), nullable=True),
    sa.Column('twitter', sa.String(), nullable=True),
    sa.Column('external', sa.String(), nullable=True),
    sa.Column('mainImage', sa.String(), nullable=False),
    sa.Column('mainVideo', sa.String(), nullable=True),
    sa.Column('bio', sa.String(), nullable=True),
    sa.Column('newsletter', sa.String(), nullable=True),
    sa.Column('businessInquiries', sa.String(), nullable=True),
    sa.Column('shopSection', sa.Boolean(), nullable=True),
    sa.Column('videoSection', sa.Boolean(), nullable=True),
    sa.Column('tourName', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['genreId'], ['genres.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('linkName'),
    sa.UniqueConstraint('userId')
    )
    op.create_table('carts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('profileId', sa.Integer(), nullable=False),
    sa.Column('subtotal', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['profileId'], ['profiles.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('follows',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('profileId', sa.Integer(), nullable=False),
    sa.Column('pepps', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['profileId'], ['profiles.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('profileId', sa.Integer(), nullable=False),
    sa.Column('total', sa.Float(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['profileId'], ['profiles.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('profileId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('previewImage', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['profileId'], ['profiles.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tours',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('profileId', sa.Integer(), nullable=False),
    sa.Column('venue', sa.String(), nullable=True),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('tourDate', sa.String(), nullable=False),
    sa.Column('ticketsLink', sa.String(), nullable=False),
    sa.Column('soldOut', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['profileId'], ['profiles.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('videos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('profileId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('video', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['profileId'], ['profiles.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cartitems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('cartId', sa.Integer(), nullable=False),
    sa.Column('productId', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('size', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['cartId'], ['carts.id'], ),
    sa.ForeignKeyConstraint(['productId'], ['products.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('orderitems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('orderId', sa.Integer(), nullable=False),
    sa.Column('productId', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('size', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['orderId'], ['orders.id'], ),
    sa.ForeignKeyConstraint(['productId'], ['products.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('productimages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('productId', sa.Integer(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['productId'], ['products.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('productstocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('productId', sa.Integer(), nullable=False),
    sa.Column('size', sa.String(), nullable=True),
    sa.Column('stock', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['productId'], ['products.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('productstocks')
    op.drop_table('productimages')
    op.drop_table('orderitems')
    op.drop_table('cartitems')
    op.drop_table('videos')
    op.drop_table('tours')
    op.drop_table('products')
    op.drop_table('orders')
    op.drop_table('follows')
    op.drop_table('carts')
    op.drop_table('profiles')
    op.drop_table('users')
    op.drop_table('genres')
    # ### end Alembic commands ###