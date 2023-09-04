"""empty message

Revision ID: 62ef56c868cf
Revises: 8ab3ea67b8e6
Create Date: 2023-09-04 07:51:06.366443

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '62ef56c868cf'
down_revision = '8ab3ea67b8e6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pedido', schema=None) as batch_op:
        batch_op.drop_column('id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pedido', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id', sa.INTEGER(), autoincrement=False, nullable=False))

    # ### end Alembic commands ###