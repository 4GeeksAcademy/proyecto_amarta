"""empty message

Revision ID: b495fb19d545
Revises: 6def8f6fc4f2
Create Date: 2023-08-25 15:05:13.435706

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b495fb19d545'
down_revision = '6def8f6fc4f2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('carrito', schema=None) as batch_op:
        batch_op.alter_column('id_prod',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('carrito', schema=None) as batch_op:
        batch_op.alter_column('id_prod',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###
