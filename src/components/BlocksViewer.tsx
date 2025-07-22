import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getBlock, 
  getBlocksByStatus, 
  getBlockStats, 
  updateBlockOwnership 
} from '@/db/sqlite';

interface Block {
  block_id: number;
  pos_x: number;
  pos_y: number;
  pos_z: number;
  status: string;
  owner_name?: string;
  purchase_date?: string;
  custom_message?: string;
}

interface BlockStats {
  available?: number;
  purchased?: number;
  reserved?: number;
}

export const BlocksViewer: React.FC = () => {
  const [stats, setStats] = useState<BlockStats>({});
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [searchBlockId, setSearchBlockId] = useState('');
  const [availableBlocks, setAvailableBlocks] = useState<Block[]>([]);
  const [purchasedBlocks, setPurchasedBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Purchase form state
  const [ownerName, setOwnerName] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  // Load initial data
  useEffect(() => {
    loadStats();
    loadAvailableBlocks();
    loadPurchasedBlocks();
  }, []);

  const loadStats = async () => {
    try {
      const blockStats = await getBlockStats();
      setStats(blockStats);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const loadAvailableBlocks = async () => {
    try {
      const blocks = await getBlocksByStatus('available');
      setAvailableBlocks(blocks.slice(0, 100)); // Limit to first 100 for performance
    } catch (err) {
      console.error('Failed to load available blocks:', err);
    }
  };

  const loadPurchasedBlocks = async () => {
    try {
      const blocks = await getBlocksByStatus('purchased');
      setPurchasedBlocks(blocks.slice(0, 100)); // Limit to first 100 for performance
    } catch (err) {
      console.error('Failed to load purchased blocks:', err);
    }
  };

  const searchBlock = async () => {
    if (!searchBlockId.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const block = await getBlock(parseInt(searchBlockId));
      if (block) {
        setSelectedBlock(block as Block);
      } else {
        setError(`Block ${searchBlockId} not found`);
      }
    } catch (err) {
      setError('Failed to search for block');
    } finally {
      setLoading(false);
    }
  };

  const purchaseBlock = async () => {
    if (!selectedBlock || !ownerName.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const success = await updateBlockOwnership(
        selectedBlock.block_id,
        ownerName,
        customMessage
      );
      
      if (success) {
        // Refresh data
        await loadStats();
        await loadAvailableBlocks();
        await loadPurchasedBlocks();
        
        // Update selected block
        setSelectedBlock({
          ...selectedBlock,
          status: 'purchased',
          owner_name: ownerName,
          custom_message: customMessage,
          purchase_date: new Date().toISOString()
        });
        
        // Clear form
        setOwnerName('');
        setCustomMessage('');
        
        alert('Block purchased successfully!');
      } else {
        setError('Failed to purchase block. It may no longer be available.');
      }
    } catch (err) {
      setError('Failed to purchase block');
    } finally {
      setLoading(false);
    }
  };

  const formatPosition = (block: Block) => {
    return `(${block.pos_x.toFixed(3)}, ${block.pos_y.toFixed(3)}, ${block.pos_z.toFixed(3)})`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'purchased': return 'bg-blue-500';
      case 'reserved': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">3D Model Blocks Manager</h1>
        <p className="text-gray-600">Manage and track individual blocks in your 3D model</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.available?.toLocaleString() || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Purchased Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.purchased?.toLocaleString() || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {((stats.available || 0) + (stats.purchased || 0)).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Block */}
      <Card>
        <CardHeader>
          <CardTitle>Search Block</CardTitle>
          <CardDescription>Enter a block ID to view its details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter block ID..."
              value={searchBlockId}
              onChange={(e) => setSearchBlockId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchBlock()}
            />
            <Button onClick={searchBlock} disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
          
          {error && (
            <div className="mt-2 text-red-600 text-sm">{error}</div>
          )}
        </CardContent>
      </Card>

      {/* Selected Block Details */}
      {selectedBlock && (
        <Card>
          <CardHeader>
            <CardTitle>Block #{selectedBlock.block_id}</CardTitle>
            <CardDescription>
              Position: {formatPosition(selectedBlock)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <Badge className={getStatusColor(selectedBlock.status)}>
                {selectedBlock.status}
              </Badge>
            </div>
            
            {selectedBlock.owner_name && (
              <div>
                <strong>Owner:</strong> {selectedBlock.owner_name}
              </div>
            )}
            
            {selectedBlock.purchase_date && (
              <div>
                <strong>Purchase Date:</strong> {new Date(selectedBlock.purchase_date).toLocaleDateString()}
              </div>
            )}
            
            {selectedBlock.custom_message && (
              <div>
                <strong>Message:</strong> {selectedBlock.custom_message}
              </div>
            )}
            
            {/* Purchase Form */}
            {selectedBlock.status === 'available' && (
              <div className="border-t pt-4 space-y-3">
                <h4 className="font-semibold">Purchase This Block</h4>
                <Input
                  placeholder="Owner name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
                <Input
                  placeholder="Custom message (optional)"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                />
                <Button 
                  onClick={purchaseBlock} 
                  disabled={!ownerName.trim() || loading}
                  className="w-full"
                >
                  {loading ? 'Processing...' : 'Purchase Block'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Blocks Lists */}
      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available">Available Blocks</TabsTrigger>
          <TabsTrigger value="purchased">Purchased Blocks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Blocks (First 100)</CardTitle>
              <CardDescription>Click on a block to view details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                {availableBlocks.map((block) => (
                  <div
                    key={block.block_id}
                    className="p-2 border rounded cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedBlock(block)}
                  >
                    <div className="font-medium">Block #{block.block_id}</div>
                    <div className="text-sm text-gray-600">
                      {formatPosition(block)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="purchased" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchased Blocks (First 100)</CardTitle>
              <CardDescription>Click on a block to view details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                {purchasedBlocks.map((block) => (
                  <div
                    key={block.block_id}
                    className="p-2 border rounded cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedBlock(block)}
                  >
                    <div className="font-medium">Block #{block.block_id}</div>
                    <div className="text-sm text-gray-600">
                      Owner: {block.owner_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatPosition(block)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
