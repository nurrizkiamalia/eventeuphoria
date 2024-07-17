'use client';

import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import useTransaction from "@/hooks/useTransactions";

const TransactionList: React.FC = () => {
  const { getOrganizerOrderList, organizerOrders, loading, error } = useTransaction();
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);

  useEffect(() => {
    getOrganizerOrderList(page, perPage);
  }, [getOrganizerOrderList, page, perPage]);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading transactions: {error}</p>;
  if (!organizerOrders) return <p>No transactions found.</p>;

  const totalAmount = organizerOrders.transactions.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Customer Email</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Event Attended</TableHead>
          <TableHead>Ticket Bought</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizerOrders.transactions.map(order => (
          <TableRow key={order.orderId}>
            <TableCell className="font-medium">{order.invoice}</TableCell>
            <TableCell>{order.customerDetails.firstName} {order.customerDetails.lastName}</TableCell>
            <TableCell>{order.customerDetails.email}</TableCell>
            <TableCell>{order.paymentMethod}</TableCell>
            <TableCell>{order.eventName}</TableCell>
            <TableCell>{order.totalTickets}</TableCell>
            <TableCell className="text-right">{order.totalPrice.toFixed(2)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <BsThreeDotsVertical className="text-tXl" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.invoice)}>Copy payment ID</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View customer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total</TableCell>
          <TableCell className="text-right">{totalAmount.toFixed(2)}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TransactionList;