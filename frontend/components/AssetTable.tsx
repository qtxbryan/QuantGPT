import { AssetTableProps } from "@/types";
import { motion } from "framer-motion";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "./ui/table";

const AssetTable = ({ assets }: AssetTableProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-[#394d9b] overflow-hidden"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-[#1a2040] hover:bg-[#1a2040]">
            <TableHead className="text-[#7dd1e7]">Asset</TableHead>
            <TableHead className="text-[#7dd1e7]">Allocation</TableHead>
            <TableHead className="text-right text-[#7dd1e7]">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset, index) => (
            <motion.tr
              key={asset.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-[#1a2040] hover:bg-[#232a4d]"
            >
              <TableCell className="text-white">{asset.name}</TableCell>
              <TableCell className="text-[#a8d897]">
                {asset.allocation}%
              </TableCell>
              <TableCell className="text-right text-white">
                ${asset.value.toLocaleString()}
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default AssetTable;
